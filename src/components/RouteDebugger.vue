<!-- <template>
  <div v-if="isDebugMode" class="route-debugger">
    <h3>Route Debugger</h3>
    <p><strong>Current Path:</strong> {{ route.path }}</p>
    <p><strong>Route Name:</strong> {{ route.name }}</p>
    <p><strong>Route Params:</strong> {{ JSON.stringify(route.params) }}</p>
    <p><strong>Route Query:</strong> {{ JSON.stringify(route.query) }}</p>
  </div>
</template> -->

<script setup lang="ts">
// Pake kalo lagi debug pas development

// import { useRoute } from 'vue-router';
// import { ref } from 'vue';
// const route = useRoute();
// const isDebugMode = ref(process.env.NODE_ENV === 'development');
</script>

<style scoped>
.route-debugger {
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 1rem;
  font-size: 0.8rem;
  z-index: 9999;
  max-width: 300px;
  border-top-left-radius: 8px;
}

.route-debugger h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.route-debugger p {
  margin: 0.25rem 0;
}
</style>
