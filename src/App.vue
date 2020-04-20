<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <el-input v-model="newMsg" @keyup.enter.native="send"/>
    <el-button @click="send">send</el-button>
    <el-button @click="pluginMehod">plugin</el-button>
    <div
      v-for="msg in msgList"
      :key="msg.message"
      class="msg-item "
      :class="{'fromMe':  href.includes(msg.from)}"
    >
      {{msg.from}}:  {{msg.message}}
    </div>
    <button class="mybtn">{{btnMsg}}</button>
    <div class="animation animated">hello world</div>

    <slot-comp>
      <template v-slot:header="headerProp">
        <div>{{headerProp.content}}</div>
      </template>
      <template v-slot:body="bodyProp">
        <h3>{{bodyProp.body}}</h3>
        <h3>{{bodyProp.body_}}</h3>
      </template>
    </slot-comp>
    <tes-foo  ttt='iooio'/>
    <bar />

  </div>
</template>

<script>
  /* eslint-disable */
  import Vue from 'vue';
  import HelloWorld from "./components/HelloWorld.vue";
  import Bar from './components/Bar.vue';
  import SlotComp from './components/slotComp.vue';
  import { Input, Button } from 'element-ui';

  Vue.component('tes-foo', {
    data() {
      return { bar: 666 }
    },
    // template: '<button>{{bar}}</button>',
    render(h) {
      return (
        <button>{this.bar}</button>
      )
    },
  })

  export default {
    name: "app",
    components: {
      HelloWorld,
      ElInput: Input,
      ElButton: Button,
      SlotComp,
      Bar,
    },
    data() {
      return {
        wsConnect: null,
        msgList: [],
        newMsg: '123',
        href: window.location.href,
        ani: false,
        btnMsg: 'enter',
      }
    },
    methods: {
      send() {
        if (this.newMsg) {
          this.wsConnect.send(this.newMsg);
          this.newMsg = '';
        }
      },
      pluginMehod() {
        this.$testMethod(666);
      }
    },
    mounted() {
      const animateDom = document.querySelector('.animation');
      document.querySelector('.mybtn').addEventListener('click', () => {
        // this.ani = !this.ani;
        if (Array.from(animateDom.classList).includes('flipOutX')) {
          animateDom.classList.remove('flipOutX');
          animateDom.classList.add('flipInX');
          this.btnMsg = 'leave';
        } else if(Array.from(animateDom.classList).includes('flipInX')){
          animateDom.classList.remove('flipInX');
          animateDom.classList.add('flipOutX');
          this.btnMsg = 'enter';
        } else {
          animateDom.classList.add('flipInX');
        }
      });
      document.querySelector('.animation').addEventListener('animationend', function end() {
        // this.classList.remove('flipOutX');
      });

      this.wsConnect = new WebSocket("ws://118.25.94.60:9999", 'echo-protocol');
      // this.wsConnect = new WebSocket("ws://localhost:9999", 'echo-protocol');

      this.wsConnect.addEventListener("open", (event) => {
        console.log('websocket opened');
      });

      this.wsConnect.addEventListener("message", (event) => {
        console.log("Message from server: ", event.data);
        this.msgList.push(JSON.parse(event.data));
      });
    },
  };
</script>

<style>
  .msg-item {
    text-align: left;
  }
  .fromMe {
    text-align: right;
    background: green;
  }
  .animation {
    display: inline-block;
    font-size: 35px;
    margin: 13px;
    background: rgb(33,33,33);
    color: rgb(90, 185, 119);
    padding: 20px;
  }


@keyframes flipInX {
  from {
    /* transform: perspective(300px) rotate3d(1, 0, 0, 90deg) scale(.2); */
    transform: perspective(300px) rotate3d(1, 0, 0, 90deg);
    opacity: 0.3;
  }

  40% {
    transform: perspective(300px) rotate3d(1, 0, 0, -20deg);
    opacity: .4;
  }

  60% {
    transform: perspective(300px) rotate3d(1, 0, 0, 10deg);
    opacity: .7;
  }

  80% {
    transform: perspective(300px) rotate3d(1, 0, 0, -5deg);
    opacity: .9;
  }

  to {
    transform: perspective(300px) rotate3d(1, 0, 0, 0deg);
    opacity: 1;
  }
}

.flipInX {
  animation-name: flipInX;
}

@keyframes flipOutX {
  from {
    transform: perspective(300px) rotate3d(1, 0, 0, 0deg);
    opacity: 1;
  }
  50% {
    transform: perspective(300px) rotate3d(1, 0, 0, 100deg);
    opacity: .4;
  }
  80% {
    transform: perspective(300px) rotate3d(1, 0, 0, 82deg);
    opacity: .1;
  }
  to {
    transform: perspective(300px) rotate3d(1, 0, 0, 90deg);
    opacity: 0;
  }
}

.flipOutX {
  animation-name: flipOutX;
}

.animated {
  animation-duration: 1s;
  animation-timing-function: linear;
  /* animation-timing-function: cubic-bezier(.41,-0.43,.64,1.45); */
  /* transform-style: preserve-3d; */
  animation-fill-mode: both;
}
</style>
