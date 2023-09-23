<template>
  <div class="card">
    <div class="card-body">
      معلومات الاشتراك:
      
      <p style="direction: rtl;">تاريخ انتهاء  الاشتراك : {{ this.$store.state.userData.finished_date.split('T')[0] }}</p>
    </div>
  </div>
</template>
<script>
export default {}
</script>