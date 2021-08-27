<template>
  <aside class="app-sidebar d-flex flex-column justify-content-between">
    <div>
      <div class="form-group my-3 mx-2">
        <form>
          <input
            type="search"
            class="form-control search-bg input-search"
            placeholder="search..."
          />
        </form>
      </div>
      <ul class="sidebar-menu">
        <p class="text-bg text-uppercase mx-3">Invoices - {{ data.length }}</p>
        <li
          class="sidebar-menu-item border-b my-2"
          v-for="(d, i) in data"
          :key="i"
          :class="[$route.fullPath.includes(d.guid) ? 'active' : '']"
        >
          <router-link :to="{ name: 'invoice', params: { guid: d.guid } }">
            <div class="d-flex justify-content-between mx-3">
              <div class="item">
                <p class="text-bg text-uppercase mb-3">INV. # - {{ d.id }}</p>
                <p class="text-bg text-uppercase mb-3">
                  ITEMS - {{ JSON.parse(d.product_details).length }}
                </p>
              </div>
              <div>
                <p class="text-bg text-uppercase mb-3">
                  {{ getTime(d.created_at) }} -
                  {{ dateTimeFromNow(d.created_at) }}
                </p>
              </div>
            </div>
            <div class="d-flex justify-content-between mx-3">
              <p class="text-bg-fullname text-capitalize mb-3">
                {{ d.full_name ? d.full_name : "Unknown" }}
              </p>
              <p class="text-bg text-uppercase mb-3 my-text">
                ₹
                {{
                  JSON.parse(d.product_details).reduce((acc, val) => {
                    return acc + val.price * val.quantity;
                  }, 0)
                }}
              </p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
import { formatTime, timeFromNow } from "@/utils/index";
export default {
  name: "Sidebar",
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getTime(date) {
      return formatTime(date);
    },
    dateTimeFromNow(date) {
      return timeFromNow(date);
    },
  },
};
</script>
