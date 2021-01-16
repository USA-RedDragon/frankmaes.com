<template>
  <h4>Posted {{ timeagoCalc }} by {{ name }}</h4>
  <p>{{ message }}</p>
</template>

<script>
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);

export default {
  name: 'GuestbookPost',
  props: {
    time: Number,
    name: String,
    message: String,
  },
  data() {
    return {
      timeAgo: new TimeAgo('en-US'),
    };
  },
  computed: {
    timeagoCalc() {
      const floortime = Math.floor(this.time);
      let epochMs = floortime*1000;
      epochMs += Math.floor((this.time-floortime)*1000);
      return this.timeAgo.format(new Date(epochMs), 'round');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
