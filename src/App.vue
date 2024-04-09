<script setup lang="ts">
import {ref, watch} from 'vue';
import type {Ref} from 'vue';
import {correctGrammarApi, translateApi} from "@/services/api";
import {AppConfig} from "@/utils/app-config.class";

let originalText: Ref<string | null> = ref(localStorage.getItem('originalText') || '');
let resultText: Ref<string | null> = ref(localStorage.getItem('resultText') || '');
let explanation: Ref<string | null> = ref(localStorage.getItem('explanation') || '');
let grammarCheckInProgress = false;

watch(originalText, (newVal) => {
  if (typeof newVal === "string") {
    localStorage.setItem('originalText', newVal);
    if (newVal === '') {
      resultText.value = '';
      explanation.value = '';
    }
  }
});
watch(resultText, (newVal) => {
  if (typeof newVal === "string") {
    localStorage.setItem('resultText', newVal);
  }
});
watch(explanation, (newVal) => {
  if (typeof newVal === "string") {
    localStorage.setItem('explanation', newVal);
  }
});

function fixGrammar() {
  const text: string = originalText.value!.trim();
  if (text === '') {
    return;
  }

  // grammarCheckInProgress = true;
  correctGrammarApi(text).then(result => {
    resultText.value = result.result;
    explanation.value = result.explanation;
  }).finally(() => {
    // grammarCheckInProgress = false;
  });
}

function translate() {
  const text: string = originalText.value!.trim();
  if (text === '') {
    return;
  }

  // grammarCheckInProgress = true;
  translateApi(text).then(result => {
    resultText.value = result.result;
    explanation.value = result.explanation;
  }).finally(() => {
    // grammarCheckInProgress = false;
  });
}
</script>

<template>
  <main>
    <div class="container">
      <h3 class="header">English Grammar Checker</h3>

      <p class="description">Write any text in English and click on "Check Grammar" to validate it.</p>

      <div class="row ml-0">
        <div class="col-6 pr-0">
          <div class="original-text">
            <div class="form-group">
              <textarea class="form-control" rows="10" autofocus placeholder="Write your text in here"
                        v-model="originalText" :disabled="grammarCheckInProgress"></textarea>
            </div>
            <div class="form-group">
              <input type="submit" class="btn check-grammar" @click="fixGrammar" value="Check grammar"
                     :disabled="grammarCheckInProgress">
            </div>
          </div>
        </div>
        <div class="col-6 pl-0">
          <div class="corrected-text">
            <div class="form-group">
              <textarea class="form-control" rows="10" readonly v-model="resultText"></textarea>
            </div>
            <div class="form-group" v-if="AppConfig.getTranslateFrom() !== ''">
              <input type="submit" class="btn check-grammar" @click="translate" value="Translate">
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-4" v-if="explanation !== ''">
        <div class="col pr-0">
          <div class="alert alert-light blockquote-footer" role="alert">
            {{ explanation }}
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
