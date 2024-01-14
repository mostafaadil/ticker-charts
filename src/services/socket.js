import store from "../store/index"
var self, $ = window.$
import { Toast } from "bootstrap";

function init() {
    try {


        String.prototype.replaceEvery = function () {
            var out = this
            while (out.includes(arguments[0])) {
                out = out.replace(arguments[0], arguments[1])
            }
            return out
        }
        window.socket = window.io.connect(store?.state?.baseUrl, {
            query: {
                id: store.state.userData.id,
            },
            transports: ["polling", "websocket"],
        });
        // if() location.reload()
        //session
        window.socket.on('connect', () => {

            window.socket.on("logout", () => {

                console.log("You will logging out ")
                localStorage.removeItem("userData")
                store.state.auth = false
                window.socket.disconnect()
                self.$router.push("/login")
                $("body").append(`

<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
  <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
      <strong class="ms-auto">تنبيه</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      تم تسجيل الدخول من متصفح آخر
    </div>
  </div>
</div>`)
                var toast;
                setTimeout(() => {
                    toast = new Toast("#liveToast")
                    toast.show()
                }, 50)
                setTimeout(() => {
                    $("#liveToast").parent().remove()
                    toast.hide()
                }, 3000)

            })
            window.socket.on("stock_data", (data) => {



                for (let i = 0; i < data.length; i++) {
                    if (data[i].name == "تاسي") {
                        store.state.tanse = data[i]
                        console.log("2222222222222", store.state.tanse)
                    }
                   if (data[i].name=="إم تي 30") {
                    store.state.mt_stock = data[i]
                    console.log("mtttttttttttt", store.state.mt_stock)
                    
                   }
                }

                data.forEach(row => {
                    for (var key in row) {
                        if (key != 'name' && key != 'symbol' && key != 'flag' && key != 'icon' && !key.includes("Class") && row[key].trim() != '-')
                            row[key] = parseFloat(row[key].replaceEvery(',', ''))

                    }
                })
                store.state.mt = data
                // console.log(data)
                var getRange = (value) => range.find(v => value >= v.from && value < v.to)
                var range = [
                    { from: 0, to: 10, range: 0.05 },
                    { from: 10, to: 20, range: 0.15 },
                    { from: 20, to: 30, range: 0.20 },
                    { from: 30, to: 50, range: 0.35 },
                    { from: 50, to: 70, range: 0.55 },
                    { from: 70, to: 90, range: 0.65 },
                    { from: 90, to: 100, range: 0.75 },
                    { from: 100, to: 110, range: 0.85 },
                    { from: 110, to: 150, range: 1.00 },
                    { from: 150, to: 170, range: 1.55 },
                    { from: 170, to: 200, range: 1.95 },
                    { from: 200, to: 250, range: 2.2 },
                    { from: 250, to: 300, range: 2.5 },
                    { from: 300, to: 350, range: 3.00 },
                ]

                store.state.red = []
                store.state.orange = []
                store.state.yellow = []
                store.state.lightGreen = []
                store.state.darkGreen = []
                store.state.data = data.filter(row => row.volume >= 50000).filter(row => (((row.high - row.low) / row.open) * 100) > 1).filter(row => row.open != row.high)
                store.state.data.forEach(row => {

                    var ed = ((row.high - row.low) / row.open) * 100
                    var newFoum = ((row.high - row.open) / row.open) * 100
                    // console.log("ed *****", ed)
                    // console.log("newFoum *****", newFoum)
                    if ((ed > 1.5) && (newFoum > 1.5)) {

                        // console.log("**** The Last formula is ****", ((row.high - row.low) / row.open) * 100)
                        if (row.name == "مرافق") { console.log("***********") }
                        var range = getRange(row.last)
                        // var yRange = row.range - row.open
                        // console.log(yRange)
                        if (row.open == row.low && row.changePercent < 2.5) {
                            row.color = "#21521FFF"
                            store.state.darkGreen.push(row)
                            // console.log("ok")
                        }
                        else if (row.open == row.low) {
                            row.color = "#67e667"
                            // console.log("no requ")
                            store.state.lightGreen.push(row)
                        }
                        else if (range && row.changePercent <= 2.5 && ((row.last || row.low) >= (row.open - range.range))) {
                            if (row.open != row.low) {
                                store.state.orange.push(row)
                            }

                        }

                        else
                            if (range && ((row.last || row.low) >= (row.open - range.range))) {
                                if (row.open != row.low) {
                                    store.state.yellow.push(row)
                                }
                            }
                        if (range && ((row.last || row.low) < (row.open - range.range))) {
                            if (row.open != row.low) {
                                store.state.red.push(row)
                            }
                        }


                        // if ((range && row.low < (row.open - range.range))) {
                        //   store.state.red.push(row)
                        //}


                        store.state.red = store.state.red.sort((a, b) => {
                            // console.log(b.changePercent - a.changePercent)
                            return b.changePercent - a.changePercent
                        })
                        store.state.yellow = store.state.yellow.sort((a, b) => {
                            // console.log(b.changePercent - a.changePercent)
                            return b.changePercent - a.changePercent
                        })
                        store.state.orange = store.state.orange.sort((a, b) => {
                            // console.log(b.changePercent - a.changePercent)
                            return b.changePercent - a.changePercent
                        })
                        store.state.darkGreen = store.state.darkGreen.sort((a, b) => {
                            // console.log(b.changePercent - a.changePercent)
                            return b.changePercent - a.changePercent
                        })
                        store.state.lightGreen = store.state.lightGreen.sort((a, b) => {
                            return b.changePercent - a.changePercent
                        })

                        // console.log(store.state.darkGreen)

                    }
                })

            })
            window.socket.on("disconnect", () => {
                console.log("Disconnected !")
                window.socket.removeAllListeners("logout")
                window.socket.removeAllListeners("stock_data")
                window.socket.removeAllListeners("disconnect")
            })
        })
    } catch (error) {
      console.log(error)
    // location.reload()
    }
}

export default {
    install(Vue) {
        self = Vue.config.globalProperties
        Vue.config.globalProperties.initSocket = init
    }
}