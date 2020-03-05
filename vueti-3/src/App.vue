<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item
          link
          href="https://github.com/j2kim99/WebFileShare"
          target="_blank"
        >
          <v-list-item-action>
            <v-icon>mdi-code-tags</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Source Code</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-help-circle-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Readme</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>P2P Chatting Service</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-row align="center" justify="center">
        <v-col cols="1" />
        <v-col cols="8">
          <h1>
            Your code is
            <span class="blue--text text--lighten-2">{{ peerID }}</span>
          </h1>
        </v-col>
        <v-col cols="1" align="center">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn color="yellow" dark v-on="on" v-on:click="share">
                <v-icon color="black"> mdi-alpha-k-circle </v-icon>
                <v-icon color="black"> mdi-share </v-icon>
              </v-btn>
            </template>
            <Span> Share code by KakaoTalk </Span>
          </v-tooltip>
        </v-col>
        <v-col cols="2" />
      </v-row>
      <v-row v-if="connID != ''" dense>
        <v-col cols="1" />
        <v-col>
          <h1>
            Currently connected to
            <span class="purple--text text--lighten-2">{{ connID }}</span>
          </h1>
        </v-col>
      </v-row>
      <v-row align="center" justify="center" dense>
        <v-col cols="1" />
        <v-col cols="8">
          <v-text-field
            label="Reciever's Code"
            v-model="targetID"
            v-on:keyup.13="join"
          ></v-text-field>
        </v-col>
        <v-col cols="1" align="center">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn color="blue" dark v-on="on" v-on:click="join"
                ><v-icon>mdi-phone-forward-outline</v-icon></v-btn
              >
            </template>
            <span>Connect</span>
          </v-tooltip>
        </v-col>
        <v-col cols="1" align="center">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn color="red" dark v-on="on" v-on:click="disconnect"
                ><v-icon>mdi-phone-off-outline</v-icon></v-btn
              >
            </template>
            <span>Disconnect</span>
          </v-tooltip>
        </v-col>
        <v-col cols="1" />
      </v-row>
      <v-row align="center" justify="center" dense>
        <v-col cols="1" />
        <v-col cols="8">
          <v-text-field
            label="Message"
            v-model="message"
            v-on:keyup.13="send"
          ></v-text-field>
        </v-col>
        <v-col cols="1" align="center">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn color="green" dark v-on="on" v-on:click="send"
                ><v-icon>mdi-send</v-icon></v-btn
              >
            </template>
            <span>Send Message</span>
          </v-tooltip>
        </v-col>
        <v-col cols="2" />
      </v-row>

      <v-row align="center" justify="center" dense>
        <v-col cols="1" />
        <v-col cols="8">
          <template
            ><v-file-input label="File" id="file"></v-file-input
          ></template>
        </v-col>
        <v-col cols="1" align="center">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn color="brown" dark v-on="on" v-on:click="sendFile"
                ><v-icon>mdi-file-send</v-icon></v-btn
              >
            </template>
            <span>Send File</span>
          </v-tooltip>
        </v-col>
        <v-col cols="2" />
      </v-row>

      <v-row align="center" dense>
        <v-col align="center">
          <v-btn v-on:click="clear">
            Delete Chatting Log
            <v-icon>mdi-delete-empty</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="1" />
        <v-col cols="10">
          <v-list>
            <v-list-item v-for="q in que" :key="q.time">
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-icon v-if="q.src == 'send'" v-on="on">
                    mdi-arrow-right
                  </v-icon>
                  <v-icon v-if="q.src == 'system'" v-on="on"> mdi-bell </v-icon>
                  <v-icon v-if="q.src == 'recv'" v-on="on">
                    mdi-arrow-left
                  </v-icon>
                </template>
                <span> {{ hms(q) }} </span>
              </v-tooltip>
              <v-list-item-content v-if="q.data.type == 'str'">
                {{ q.data.data }}
              </v-list-item-content>
              <v-list-item-content v-if="q.data.type == 'fileSrc'">
                {{ q.data.name }}
              </v-list-item-content>
              <v-tooltip right v-if="q.data.type == 'fileSrc'">
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-on="on"
                    color="black"
                    :href="q.data.data"
                    :download="q.data.name"
                  >
                    <v-icon v-if="q.data.type == 'fileSrc'">
                      mdi-download
                    </v-icon>
                  </v-btn>
                </template>
                Download <span style="color:#99FF99"> {{ q.data.name }} </span>
              </v-tooltip>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="1" />
      </v-row>
    </v-content>

    <v-footer app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    peer: null,
    conn: null,
    peerID: "",
    connID: "",
    targetID: "",
    message: "",
    que: []
  }),
  created() {
    var connparam = this.getParameters("conn");
    if (connparam != "") {
      this.targetID = connparam;
    }
    var vm = this;
    console.log(vm);

    this.$vuetify.theme.dark = true;

    this.peer = new Peer(null, {
      debug: 2
    });
    this.peer.on("open", function(id) {
      console.log("ID: " + id);
      vm.peerID = id;
      vm.conn = null;

      if (vm.targetID != "") {
        vm.join();
      }
    });
    this.peer.on("connection", function(c) {
      if (vm.conn && vm.connID != "") {
        c.on("open", function() {
          c.send({ type: "str", data: "Already Connected" });
          setTimeout(function() {
            c.close();
          }, 500);
        });
        console.log("Request from " + c.peer + " denied");
        return;
      }

      vm.conn = c;
      console.log("Connected: " + vm.conn.peer);
      var t = new Date();
      vm.que.push({
        src: "system",
        time: t,
        data: {
          type: "str",
          data: "Connected to " + vm.conn.peer
        }
      });
      vm.connID = "" + vm.conn.peer;
      vm.ready();
    });
    this.peer.on("disconnected", function() {
      this.que.push({
        src: "system",
        data: {
          type: "str",
          data: "Disconnected"
        }
      });
      console.log("Disconnected");
      vm.connID = "";
      vm.conn = null;
    });
    this.peer.on("close", function() {
      this.que.push({
        src: "system",
        data: {
          type: "str",
          data: "Connection Closed"
        }
      });
      console.log("Closed");
      vm.connID = "";
      vm.conn = null;
    });
    this.peer.on("error", function(err) {
      console.log(err);
      alert("" + err);
    });

    Kakao.init("179ef71ef38badfc4529b020b3aa94ae");
  },
  methods: {
    getParameters: function(paramName) {
      // 리턴값을 위한 변수 선언
      var returnValue;

      // 현재 URL 가져오기
      var url = location.href;

      // get 파라미터 값을 가져올 수 있는 ? 를 기점으로 slice 한 후 split 으로 나눔
      var parameters = url.slice(url.indexOf("?") + 1, url.length).split("&");

      // 나누어진 값의 비교를 통해 paramName 으로 요청된 데이터의 값만 return
      for (var i = 0; i < parameters.length; i++) {
        var varName = parameters[i].split("=")[0];
        if (varName.toUpperCase() == paramName.toUpperCase()) {
          returnValue = parameters[i].split("=")[1];
          return decodeURIComponent(returnValue);
        }
      }
    },
    share: function() {
      var url = "http://192.168.35.129:8080/";
      var link = url + "?conn=" + this.peerID + "&";

      if (this.peerID != "") {
        Kakao.Link.sendDefault({
          objectType: "text",
          text: "You've got a chatting request from " + this.peerID,
          link: {
            webUrl: link,
            mobileWebUrl: link
          }
        });
      }
    },

    ready: function() {
      var vm = this;
      this.conn.on("data", function(data) {
        console.log("Data recieved");
        var t = new Date();
        vm.que.push({ src: "recv", time: t, data: data });
      });
    },
    join: function() {
      var vm = this;
      if (this.conn) {
        this.conn.close();
        if (this.connID != "") {
          var t = new Date();
          vm.que.push({
            src: "system",
            time: t,
            data: {
              type: "str",
              data: "Disconnected from " + this.connID
            }
          });
        }
        this.connID = "";
      }
      this.conn = this.peer.connect(this.targetID, {
        reliable: true
      });
      this.targetID = "";
      this.conn.on("open", function() {
        console.log("Connected to: " + vm.conn.peer);
        var t = new Date();
        vm.que.push({
          src: "system",
          time: t,
          data: {
            type: "str",
            data: "Connected to " + vm.conn.peer
          }
        });
        vm.connID = "" + vm.conn.peer;
      });
      this.conn.on("data", function(data) {
        console.log("Data recieved");
        var t = new Date();
        vm.que.push({ src: "recv", time: t, data: data });
      });
    },
    disconnect: function() {
      var vm = this;
      if (this.conn) {
        this.conn.close();
        var t = new Date();
        if (this.connID != "") {
          vm.que.push({
            src: "system",
            time: t,
            data: {
              type: "str",
              data: "Disconnected from " + this.connID
            }
          });
        }
        this.conn = null;
        this.connID = "";
      }
    },
    clear: function() {
      if (
        confirm(
          "Every messages and files will be deleted.\nThis action cannot be undone.\nAre you sure to do this?"
        )
      ) {
        var vm = this;
        var t = new Date();
        vm.que = [
          {
            src: "system",
            time: t,
            data: { type: "str", data: "Message Cleared" }
          }
        ];
      }
    },
    send: function() {
      var vm = this;
      if (vm.conn && vm.conn.open) {
        var data = {
          type: "str",
          data: vm.message
        };
        var t = new Date();
        vm.conn.send(data);
        vm.que.push({ src: "send", time: t, data: data });
        vm.message = "";
      } else {
        if (this.connID != "") {
          alert("Connection Lost");
        } else {
          alert("Connect to peer first");
        }
        this.disconnect();
      }
    },
    sendFile: function() {
      var vm = this;
      if (!vm.conn || !vm.conn.open) {
        alert("Connection Lost");
        this.disconnect();
      }
      var file = document.getElementById("file").files[0];
      var reader = new FileReader();
      reader.onload = function(e) {
        var data = {
          type: "fileSrc",
          name: file.name,
          data: e.target.result
        };
        vm.conn.send(data);
        var t = new Date();
        vm.que.push({ src: "send", time: t, data: data });
      };
      reader.readAsDataURL(file);
    },
    hms: function(q) {
      var vm = this;
      var h = q.time.getHours();
      var m = q.time.getMinutes();
      var s = q.time.getSeconds();
      if (m < 10) {
        m = "0" + m;
      }
      if (s < 10) {
        s = "0" + s;
      }
      var hms = "[" + h + ":" + m + ":" + s + "] ";
    }
  }
};
</script>
