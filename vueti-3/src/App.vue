<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link href="https://github.com/j2kim99/WebFileShare">
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
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-row align="center" justify="center" dense>
        <v-col cols="1" />
        <v-col cols="8">
          <v-text-field label="Reciever's Code"></v-text-field>
        </v-col>
        <v-col cols="1" align="center">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn color="blue" dark v-on="on"
                ><v-icon>mdi-phone-forward-outline</v-icon></v-btn
              >
            </template>
            <span>Connect</span>
          </v-tooltip>
        </v-col>
        <v-col cols="1" align="center">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn color="red" dark v-on="on"
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
          <v-text-field label="Message"></v-text-field>
        </v-col>
        <v-col cols="1" align="center">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn color="green" dark v-on="on"
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
          <template><v-file-input label="File"></v-file-input></template>
        </v-col>
        <v-col cols="1" align="center">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn color="brown" dark v-on="on"
                ><v-icon>mdi-file-send</v-icon></v-btn
              >
            </template>
            <span>Send File</span>
          </v-tooltip>
        </v-col>
        <v-col cols="2" />
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
                <span> {{ q.time }} </span>
              </v-tooltip>
              <v-list-item-content v-if="q.data.type == 'str'">
                {{ q.data.data }}
              </v-list-item-content>
              <v-list-item-content v-if="q.data.type == 'file'">
                {{ q.data.name }}
              </v-list-item-content>
              <v-tooltip right v-if="q.data.type == 'file'">
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-on="on"
                    color="yellow"
                    :href="q.data.data"
                    :download="q.data.name"
                    target="_blank"
                  >
                    <v-icon v-if="q.data.type == 'file'" color="black">
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
      <span>&copy; 2019</span>
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
    que: [
      {
        src: "send",
        time: "12:34",
        data: { type: "str", data: "hello" }
      },
      {
        src: "recv",
        time: "12:35",
        data: { type: "str", data: "hello to you too" }
      },
      {
        src: "send",
        time: "12:36",
        data: {
          type: "file",
          name: "hello.jpg",
          data:
            "https://j2kim99.github.io/WebFileShare/fileTutorial/helloworld.jpg"
        }
      },
      {
        src: "system",
        time: "12:37",
        data: { type: "str", data: "Disconnected" }
      }
    ]
  }),
  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>
