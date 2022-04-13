<template>
  <div v-if="source" :class="[isSuitable ? 'border border-blue-800' : '']" class="profile max-w-md mx-auto bg-white rounded-sm mb-4 shadow-md overflow-hidden md:max-w-2xl bg-gray-50 rounded-sm p-0.5">
    <div class="md:flex">
      <div class="md:flex-shrink-0 h-36 border bg-[#bbb]">
        <img class="w-full h-full object-cover" :src="source.avatar" :alt="source.name" loading="lazy">
      </div>
      <div class="w-full h-full">
        <div class="profile-info w-full relative mb-3">
          <div class="pl-4 mt-2">
            <div class="flex justify-between mb-1">
              <h3 class="text-xl text-black">
                <text-highlight :queries="searchQuery" >{{source.name}}</text-highlight>
              </h3>
              <span class="font- text-slate-400 text-sm"> <text-highlight :queries="searchQuery" >{{source.email}}</text-highlight></span>
            </div>
            <p class="font-bold text-[#0000008B] text-sm">
              <text-highlight :queries="searchQuery" >{{source.title}}</text-highlight></p>
            <p class="font- text-slate-400 text-sm">
              <text-highlight :queries="searchQuery" >{{source.address}}</text-highlight>
             <em><text-highlight :queries="searchQuery" >{{source.city}}</text-highlight></em>
            </p>
          </div>
        </div>
        <div class="">
          <button @click="mark" class="uppercase pt-4 ml-4 font-medium text-sm text-[#009688]">
           {{isSuitable ? 'Skip selection' : 'Mark as suitable'}}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileCard',
  props: {
    source: {
      type: Object
    },
    searchQuery: {
      type: String,
      default: ''
    }
  },
  computed: {
    isSuitable() {
      return this.$store.getters['profile/isProfileSuitable'](this.source.email)
    }
  },
  methods: {
    mark() {
      this.$parent.$parent.$emit('mark', this.source)
    }
  }
}
</script>

<style scoped lang="scss">
.text__highlight {
  background: #fff73b;
}
.profile {
  img {
    height: 100%;
    width: 100%;
  }
}
.profile-info {
  &:after {
    content: "";
    width: 100%;
    height: 1px;
    position: absolute;
    margin-top: 10px;
    background: #0000001F;
  }
}
</style>
