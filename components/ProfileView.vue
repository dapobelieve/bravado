<template>
  <div class="search-view px-3 pt-3 pb-2">
    <div class="mb-3 z-100">
      <form>
        <label for="search" class="inline-flex justify-center mr-2">
          <img src="~/assets/images/search.svg" loading="lazy">
        </label>
        <input v-model="quickSearch" ref="searchInput" autofocus id="search" type="text" >
      </form>
    </div>
    <div class="">
      <VirtualList
        @mark="mark"
        v-if="profiles.length"
        class="profile-list"
        style="overflow-y: auto;"
        :data-key="'email'"
        :data-sources="filteredRecords"
        :data-component="profileComponent"
        :extra-props="{ searchQuery: quickSearch }"
      >
      </VirtualList>
      <div v-else class="w-full flex items-center flex-col justify-center">
        <Loader class="mt-20" />
        <span class="mt-2">loading..</span>
      </div>
    </div>
  </div>
</template>

<script>
import VirtualList from 'vue-virtual-scroll-list';
import ProfileCard from '../components/ProfileCard';
import { mapGetters } from 'vuex';
export default {
  data () {
    return {
      quickSearch: "",
      profileComponent: ProfileCard,
    }
  },
  watch: {
    "quickSearch": {
      async handler(val) {
        if(val.length) {
          this.$router.push('/search/' + val);
        }else {
          this.$router.push('/');
        }
      }
    },
    "$route": {
      immediate: true,
      deep: true,
      handler(val) {
        if (val.name === 'search-path') {
          this.quickSearch = val.params.path;
        }
      }
    }
  },
  components: {
    VirtualList,
    ProfileCard
  },
  computed: {
    ...mapGetters({
      profiles: 'profile/profiles',
    }),
    filteredRecords () {
      let data = this.profiles;
      data = data.filter((row) => {
        return Object.keys(row).some((key) => {
          return String(row[key]).toLowerCase().indexOf(this.quickSearch.toLowerCase()) > -1;
        });
      });
      return data;
    },
  },
  methods: {
    mark(data) {
      this.$store.commit('profile/MARK_PROFILE', data);
    }
  },
  mounted() {
    this.$refs.searchInput.focus();
  },
  async beforeMount() {
    await this.$store.dispatch("profile/getProfiles");
  }
}
</script>

<style scoped lang="scss">
.search-view {
  @apply border overflow-hidden bg-white shadow-sm bg-white;
  max-width: 38rem;
  width: 100%;
  height: 100%;
  max-height: 40.18rem;
  form {
    @apply flex items-center shadow-lg rounded-sm border bg-[#FAFAFA] px-4 py-2;
    input {
      @apply flex-grow text-2xl focus:outline-none bg-[#FAFAFA]
    }
  }

  .profile-list {
    height: 35rem;

    &::-webkit-scrollbar {
      width: 19px;
    }

    &::-webkit-scrollbar-track {
      background: #00000029;
      border-left: 9px solid white;
      border-right: 9px solid white
    }

    &::-webkit-scrollbar-thumb {
      background: #4D4D4D;
      border-left: 3px solid white;
      border-radius: 20px;
      border-right: 3px solid white
    }
  }
}
</style>
