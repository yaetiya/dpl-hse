<script lang="ts">
  import { onMount } from "svelte";
  //   import * as d3 from "d3";
  //   var data = [30, 86, 168, 281, 303, 365];
  import {
    VisGroupedBar,
    VisXYContainer,
    VisAxis,
    VisStackedBar,
    VisLine,
    VisCrosshair,
    VisTooltip,
  } from "@unovis/svelte";
  export let data: {
    x: number;
    y: number;
  }[] = [];
  export let Ylabel: string;
  export let Xlabel: string;
  export let title: string;

  const x = (d: any) => d.x;
  const y = (d: any) => d.y;
  const template = (d: any) =>
    [Intl.DateTimeFormat().format(d.x), d.y].join(", ");
</script>

<div class="rounded-lg border bg-background">
  <h3>{title}</h3>
  <h2>{data.reduce((p, c) => p + c.y, 0)}</h2>
  <VisXYContainer {data}>
    <!-- <VisGroupedBar {x} {y} color="hsl(var(--primary) / 0.2)" /> -->
    <!-- <VisStackedBar {x} {y} barWidth={5} color="#E2203A" /> -->
    <VisLine {x} {y} />
    <VisTooltip />
    <VisAxis
      type="x"
      label={Xlabel}
      gridLine={false}
      tickFormat={(value) => Intl.DateTimeFormat().format(value)}
      domainLine={false}
    />
    <VisAxis
      type="y"
      domainLine={false}
      label={Ylabel}
    
    />
    <VisCrosshair {template} />
  </VisXYContainer>
</div>

<style>
  h3 {
    font-size: 18px;
    margin-bottom: 10px;
  }
  h2 {
    font-size: 24px;
    margin-bottom: 20px;
    font-weight: bold;
  }
  div {
    padding: 10px;
  }
</style>
