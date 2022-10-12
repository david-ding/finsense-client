<script lang="ts">
  import Input from "./Input.svelte";
  import type { Ratio } from "$lib/entities/ratio";
  import { Subject } from "rxjs";
  import { combineLatestWith } from "rxjs/operators";
  import { getContext, onMount } from "svelte";

  const htmlId = getContext<string>("htmlId");

  export let name: string = null;
  export let value: Ratio = null;

  const antecedentSubject$ = new Subject<number>();
  const consequentSubject$ = new Subject<number>();

  const handleAntecedentInput = (event: CustomEvent) => {
    antecedentSubject$.next(+event.detail);
  };

  const handleConsequentInput = (event: CustomEvent) => {
    consequentSubject$.next(+event.detail);
  };

  onMount(() => {
    return antecedentSubject$
      .pipe(combineLatestWith(consequentSubject$))
      .subscribe(([antecedent, consequent]) => {
        value = { antecedent, consequent };
      });
  });
</script>

<div class="flex items-center">
  <Input
    {name}
    htmlIdOverride={htmlId}
    on:input={handleAntecedentInput}
    maskOptions={{
      mask: Number,
      scale: 0,
      signed: false,
      max: 999,
    }}
    type="text"
    value={value?.antecedent}
  />
  &nbsp;for&nbsp;
  <Input
    name={name && `${name}-consequent`}
    htmlIdOverride={`${htmlId}-consequent`}
    on:input={handleConsequentInput}
    maskOptions={{
      mask: Number,
      scale: 0,
      signed: false,
      max: 999,
    }}
    type="text"
    value={value?.consequent}
  />
</div>
