<template>
  <div class="container">
    <img
      src="https://s3.amazonaws.com/hr-assets/0/1527626183-88c8070977-isitBSTSample0.png"
      alt="Binary Search"
    ><span>{{ msg }}</span>
  </div>
</template>

<script>
export default {
  name: 'StructureItem',
  props: {
    name: String,
    imageURL: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #c7733b;
}
</style>
