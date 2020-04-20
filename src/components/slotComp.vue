<template>
  <div>
    this is child component;
    <slot name="header" v-bind="head">default header</slot>
    <slot name="body" :body="body" :body_="body_">default body</slot>
  </div>
</template>

<script>
export default {
  name: 'slot-comp',
  data() {
    return {
      head: {content: 'head string'},
      body: 'body string',
      body_: 'body string___',
    }
  }
}
</script>