<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Bazi,
  getStemFelement, getBranchFelement,
  getStemPolarity,
  getHiddenStems, getGrowthStage
} from 'bazi'
import type { BaziChart, Felement, Stem } from 'bazi'

const ELEMENT_CLASS: Record<Felement, string> = {
  'wood': 'wood', 'fire': 'fire', 'earth': 'earth', 'metal': 'metal', 'water': 'water',
}

const PILLAR_KEYS = ['year', 'month', 'day', 'hour'] as const
type PillarKey = typeof PILLAR_KEYS[number]

const PILLAR_LABELS: Record<PillarKey, string> = {
  year: '年柱', month: '月柱', day: '日柱', hour: '時柱',
}

const datetime = ref('1990-01-27T18:00')
const chart    = ref<BaziChart | null>(null)
const errorMsg = ref('')

const pillars = computed(() => {
  if (!chart.value) return []
  return PILLAR_KEYS.map(key => {
    const p      = chart.value![key]
    const stemEl = getStemFelement(p.stem)
    const brEl   = getBranchFelement(p.branch)
    const hidden = getHiddenStems(p.branch)
    return {
      label:     PILLAR_LABELS[key],
      stem:      p.stem,
      branch:    p.branch,
      stemCls:   ELEMENT_CLASS[stemEl],
      branchCls: ELEMENT_CLASS[brEl],
      stemSub:   `${stemEl} · ${getStemPolarity(p.stem)}`,
      branchSub: `${brEl} · ${getBranchPolarity(p.branch)}`,
      stage:     getGrowthStage(p.stem, p.branch),
      hidden:    Object.entries(hidden).map(([s, pct]) => ({
        stem: s as Stem,
        cls:  ELEMENT_CLASS[getStemFelement(s as Stem)],
        pct:  Math.round((pct ?? 0) * 100),
      })),
    }
  })
})

function calculate(): void {
  try {
    // chart.value    = new Bazi(datetime.value).chart
    errorMsg.value = ''
  } catch {
    errorMsg.value = '無效的日期時間，請重新輸入。'
    chart.value    = null
  }
}

calculate()
</script>

<template>
  <header>
    <h1>八字命盤</h1>
    <p class="subtitle">Bazi · Four Pillars of Destiny</p>
  </header>

  <section class="controls">
    <label for="datetime">生辰日時</label>
    <input id="datetime" v-model="datetime" type="datetime-local" />
    <button @click="calculate">排盤</button>
  </section>

  <p v-if="errorMsg" class="error">{{ errorMsg }}</p>

  <section v-if="chart">
    <div class="board">
      <div v-for="p in pillars" :key="p.label" class="pillar">
        <p class="pillar-label">{{ p.label }}</p>
        <div class="cell" :class="p.stemCls">
          <span class="hanzi">{{ p.stem }}</span>
          <span class="sub">{{ p.stemSub }}</span>
        </div>
        <div class="cell" :class="p.branchCls">
          <span class="hanzi">{{ p.branch }}</span>
          <span class="sub">{{ p.branchSub }}</span>
        </div>
        <p class="stage-badge">{{ p.stage }}</p>
        <div class="hidden-row">
          <span v-for="h in p.hidden" :key="h.stem" class="tag" :class="h.cls">
            {{ h.stem }}<small>{{ h.pct }}%</small>
          </span>
        </div>
      </div>
    </div>

    <details class="raw-details">
      <summary>Raw JSON</summary>
      <pre>{{ JSON.stringify(chart, null, 2) }}</pre>
    </details>
  </section>
</template>
