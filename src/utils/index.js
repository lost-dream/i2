import Vue from "vue";

/**
 * 清楚登录信息
 */
export function clearLoginInfo() {
  Vue.cookie.delete("token");
}
