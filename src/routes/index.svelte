<script context="module" lang="ts">
  import type { Preload } from "@sapper/common"

  export const preload = async function (this, page, session) {
    return this.redirect(301, "admin")
  }
</script>
