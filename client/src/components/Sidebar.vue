<template>
  <aside class="app-sidebar d-flex flex-column justify-content-between">
    <div>
      <div class="form-group my-3 mx-2">
        <form>
          <input
            type="search"
            class="form-control search-bg"
            placeholder="search..."
          />
        </form>
      </div>
      <ul class="sidebar-menu">
        <p class="text-bg text-uppercase mx-3">Invoices - 54</p>
        <li
          class="sidebar-menu-item border-b my-2"
          v-for="(d, i) in data"
          :key="i"
        >
          <div class="d-flex justify-content-between mx-3">
            <div>
              <p class="text-bg text-uppercase">INV. # - {{ d.id }}</p>
              <p class="text-bg text-uppercase">
                ITEMS - {{ JSON.parse(d.product_details).length }}
              </p>
            </div>
            <div>
              <p class="text-bg text-uppercase">11:00 AM - today</p>
              <p class="text-bg text-uppercase">
                GHS
                {{
                  JSON.parse(d.product_details).reduce((acc, val) => {
                    return acc + val.price * val.quantity;
                  }, 0)
                }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  name: "Sidebar",
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
};
</script>
