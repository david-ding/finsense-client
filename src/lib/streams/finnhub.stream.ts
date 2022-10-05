import { isEmpty, negate } from "lodash-es";
import { lastValueFrom, Subject, Subscription } from "rxjs";
import { filter, take, throttleTime } from "rxjs/operators";
import type { Holding } from "$lib/entities/holding";
import { symbols } from "$lib/stores/features/holdings/holdings.derived-stores";
import { holdingsActions } from "$lib/stores/features/holdings/holdings.store";
import { dispatch } from "$lib/stores/redux-store";
import { createCurrencyAmount } from "$lib/utils/currency-amount.utils";
import { observe } from "$lib/utils/store.utils";

let socket: WebSocket;
const liveQuote$Map: Record<string, Subject<Partial<Holding>>> = {};

const subscriptions: Array<Subscription> = [];

const connectFinnhubLiveQuotes = async (): Promise<WebSocket> => {
  if (socket) {
    return socket;
  }

  socket = new WebSocket("wss://ws.finnhub.io?token=bqdeoq7rh5rf95updm4g");

  const latestSymbols = await lastValueFrom(
    observe(symbols).pipe(filter<Array<string>>(negate(isEmpty)), take(1)),
  );

  socket.onopen = () => {
    latestSymbols.forEach((symbol) => {
      socket.send(
        JSON.stringify({
          type: "subscribe",
          symbol,
        }),
      );
      liveQuote$Map[symbol] = new Subject();
      subscriptions.push(
        liveQuote$Map[symbol]
          .pipe(throttleTime(1000), filter(Boolean))
          .subscribe((liveQuoteUpdate) => {
            dispatch(holdingsActions.updateLiveQuote(liveQuoteUpdate));
          }),
      );
      console.debug(`Subscribing to ${symbol}`);
    });
  };

  socket.onmessage = (event) => {
    const { data: liveQuotes } = JSON.parse(event.data);
    console.debug(liveQuotes);

    liveQuotes?.forEach(({ s: symbol, p: priceValue }) =>
      liveQuote$Map[symbol].next({
        symbol,
        price: createCurrencyAmount(priceValue, "USD"),
      }),
    );
  };

  return socket;
};

const disconnectFinnhubLiveQuotes = (): void => {
  if (!socket) {
    return;
  }
  socket.close();
  socket = null;

  subscriptions.forEach((subscription) => subscription?.unsubscribe());
  console.debug("disconnected");
};

export { connectFinnhubLiveQuotes, disconnectFinnhubLiveQuotes };
