<template>
  <div ref="printDiv">
    <h6 class="text-uppercase my-5">Invoice Details</h6>
    <div class="container mt-5">
      <div class="card shadow-lg">
        <div class="card-body px-5">
          <div class="d-flex justify-content-between">
            <div>
              <h6 class="text-uppercase">invoice</h6>
              <h6 class="text-uppercase"># inv{{ invoice.id }}</h6>
              <p class="text-customer">
                {{ getTime(invoice.created_at) }} -
                {{ dateTimeFromNow(invoice.created_at) }}
              </p>
            </div>
            <div class="d-flex">
              <div class="me-5">
                <p class="text-customer mb-0">Customer Details</p>
                <p class="mb-0">{{ invoice.full_name }}</p>
                <p class="text-customer mb-0">{{ invoice.email_id }}</p>
              </div>
              <div>
                <button
                  class="btn btn-print text-uppercase"
                  type="button"
                  @click="printInvoice"
                >
                  PRINT
                </button>
              </div>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table">
              <thead class="border-t">
                <tr>
                  <th class="table-header">Title</th>
                  <th class="table-header">Quantity</th>
                  <th class="table-header">Price - ₹</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="productDetails.length">
                  <tr v-for="(product, i) in productDetails" :key="i">
                    <td>{{ product.item }}</td>
                    <td>{{ product.quantity }}</td>
                    <td>
                      {{
                        product.price.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })
                      }}
                    </td>
                  </tr>
                </template>

                <template v-else>
                  <tr>
                    <td colspan="6">
                      <p class="text-center">No data found</p>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
          <div class="row justify-content-end">
            <div class="col col-lg-2">
              <h6 class="inv-text">Sub Total</h6>
            </div>
            <div class="col col-lg-2">
              <h6>
                ₹
                {{
                  subTotal.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })
                }}
              </h6>
            </div>
          </div>
          <div class="row justify-content-end">
            <div class="col col-lg-2">
              <h6 class="inv-text">
                Tax ({{ `${invoice.tax ? invoice.tax : 0}%` }})
              </h6>
            </div>
            <div class="col col-lg-2">
              <h6>
                ₹
                {{
                  amountTaxed.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })
                }}
              </h6>
            </div>
          </div>
          <div class="row justify-content-end">
            <div class="col col-lg-2">
              <h6 class="inv-text">
                Discount ({{ `${invoice.discount ? invoice.discount : 0}%` }})
              </h6>
            </div>
            <div class="col col-lg-2">
              <h6>
                ₹
                {{
                  amountDiscount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })
                }}
              </h6>
            </div>
          </div>
          <div class="row justify-content-end mt-3">
            <div class="col col-lg-2">
              <h6>Grand Total</h6>
            </div>
            <div class="col col-lg-2">
              <h6>
                ₹
                {{
                  grandTotal.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })
                }}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { formatTime, timeFromNow } from "@/utils/index";
export default {
  name: "Invoice",
  data() {
    return {
      invoice: {},
      productDetails: [],
    };
  },
  computed: {
    //compute subtotal
    subTotal() {
      return this.productDetails.reduce((acc, val) => {
        return acc + val.price * val.quantity;
      }, 0);
    },

    amountTaxed() {
      if (this.invoice.tax) {
        return +this.subTotal * (+this.invoice.tax / 100);
      }
      return 0;
    },

    amountDiscount() {
      if (this.invoice.discount) {
        return +this.subTotal * (+this.invoice.discount / 100);
      }
      return 0;
    },

    //compute subtotal
    grandTotal() {
      return (
        Number(this.subTotal) -
        (Number(this.amountTaxed) + Number(this.amountDiscount))
      );
    },
  },
  watch: {
    // fetch data when param changes
    "$route.params.guid": function() {
      this.fetchData();
    },
  },
  methods: {
    // fetch invoices
    async fetchData() {
      try {
        const paramId = this.$route.params.guid;
        const { data: res } = await axios.get(
          `http://localhost:3000/api/invoices/${paramId}`
        );
        this.invoice = res.data;
        this.productDetails = JSON.parse(this.invoice.product_details);
      } catch (error) {
        console.log(error);
      }
    },

    getTime(date) {
      return formatTime(date);
    },

    dateTimeFromNow(date) {
      return timeFromNow(date);
    },

    //print invoice
    printInvoice() {
      const printContents = this.$refs.printDiv.innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      return false;
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
<style scoped></style>
