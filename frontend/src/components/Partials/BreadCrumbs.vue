<template>
  <div
    class="container bread-crumbs"
    v-if="breadCrumbs"
  >
    <div class="row">
      <div class="col-12">

        <router-link
          class="bread-crumb"
          v-for="(breadCrumb, index) in breadCrumbs"
          :key="breadCrumb.to"
          :to="`${breadCrumb.to}`"
        > {{breadCrumb.text}} <span v-if="index !== breadCrumbs.length - 1"> / </span> </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    computed: {
      breadCrumbs() {
        let pathArray = this.$route.path.split('/');
        pathArray.shift();
        let breadCrumbs = pathArray.reduce((breadCrumbArray, path, idx) => {
          breadCrumbArray.push({
            path: path,
            to: breadCrumbArray[idx - 1]
              ? '/' + breadCrumbArray[idx - 1].path + '/' + path
              : '/' + path,
            text: this.$route.matched[idx].meta.breadCrumb || path,
          });
          return breadCrumbArray;
        }, []);
        return breadCrumbs;
      },
    },
  };
</script>
