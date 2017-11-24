<template>
  <div>
    <toolbar :title="course.title" link="/home"></toolbar>
            <v-card class="elevation-0">
              <d-player :video="{url : 'http://172.104.189.169:4400/api/getfile/' + course.video, pic: course.cover}"
                            :contextmenu="contextmenu"
                            :screenshot="true"
                            ref="player">
                  </d-player>
              <v-card-actions>
                <v-icon>remove_red_eye</v-icon>&nbsp; <span>{{course.view}}</span> &nbsp;&nbsp;
                <v-icon>shopping_cart</v-icon>&nbsp; <span>{{course.purchase}}</span> &nbsp;&nbsp;
                <v-icon>fa-money</v-icon> <span><b>THB{{course.price}}</b></span>
                <v-spacer></v-spacer>
                <span>
                  <v-avatar size="25px">
                    <img :src="course.avatar">
                  </v-avatar>
                  {{course.fname}} {{course.lname}}
                </span>
              </v-card-actions>
              <q-card-separator />
              <v-card-title>
                <span class="headline">{{course.title}}</span>
              </v-card-title>
              <v-card-text>
                 <p class="text-xs-left"v-html="course.description"></p>
              </v-card-text>
            </v-card>
            <v-card class="elevation-0" style="background-color:#EEEEEE;">
                <v-card-text>
                  <template v-if="purchaseCourse">
                    <v-btn primary block @click.native="CourseInfo(course.course_id)">หน้าจัดการคอร์ส</v-btn>
                  </template>
                  <template v-else-if="!purchaseCourse && $store.state.isLogin == true">
                    <div class="form">
                        <form ref="omiseform" name="checkoutForm" method="POST" :action="'http://172.104.189.169:4200/checkout/' + course.course_id +'/' + $store.state.profile.user_id">
                         <!-- <v-btn type="submit">submitsubmit</v-btn> -->
                        <v-btn primary block class="checkout-button-1" type="submit" id="checkout-button-1" ref="cbutton1"><v-icon dark>shopping_cart</v-icon>&nbsp;ซื้อตอนนี้</v-btn>
                      </form>
                    </div>
                    <v-text-field solo v-model="userRecommened" label="ไอดีของผู้แนะนำ">ไอดีผู้แนะนำ</v-text-field>
                  </template>

                  <template v-else-if="$store.state.isLogin == false || $store.state.isLogin == undefined">
                    <v-card>
                      <v-card-text>เฉพาะสมาชิกเท่านั้น</v-card-text>
                    </v-card>
                  </template>
              </v-card-text>
            </v-card>

  </div>
</template>
<script>
import {
  QCardTitle,
  QVideo,
  QCard,
  QCardActions,
  QCardMedia,
  QCardMain,
  QIcon,
  QCardSeparator
} from 'quasar'
export default {
  beforeCreate() {
    navigator.vibrate(50)
    // this.$store.dispatch('addCourseView', this.$route.params.id)
  },
  components: {
    QCardTitle,
    QVideo,
    QCard,
    QCardActions,
    QCardMedia,
    QCardMain,
    QIcon,
    QCardSeparator
  },
  data () {
    return {
      data: {},
      lesson: [],
      contextmenu: [
          {
              text: 'GitHub',
              link: 'https://github.com/MoePlayer/vue-dplayer'
          }
      ],
      userRecommened: ''
    }
  },
  mounted () {
    this.$options.sockets.purchase = (data) => {
      data.price = this.course.price
      console.log('data: ' + JSON.stringify(data))
      this.$store.dispatch('purchaseCourse', data)
      this.$store.dispatch('pullLesson', data.course_id)
      if (this.userRecommened !== '') {
        this.$store.dispatch('addUserRecommend', data.user_id)
      }
    }
    OmiseCard.configure({
      publicKey:        'pkey_test_59wttviu3e8b5dzulzp',
      amount:           this.course.price + '00',
      currency:         'thb',
      image:           'https://image.ibb.co/hS77sm/logo.png',
      frameLabel:       'Salon Academy',
      frameDescription: 'สำหรับบัตร เดบิต/เครดิต',
      buttonLabel:      'จ่ายตอนนี้',
      location:         'no',
      billingName:      '',
      billingAddress:   '',
      submitFormTarget: null,
    });
      // Configuring your own custom button
      OmiseCard.configureButton('#checkout-button-1', {
        frameLabel: 'ชำระเงินซื้อคอร์ส ' + this.course.title ,
        submitLabel: 'จ่ายตอนนี้',
      });
      // Then, attach all of the config and initiate it by 'OmiseCard.attach();' method
      OmiseCard.attach();
  },
  methods: {
    CourseInfo (course_id) {
      console.log('course_id: ' + course_id)
      this.$router.push('/coursePurchase/')
    }
  },
  computed: {
    allcourse () {
      return this.$store.state.course
    },
    course () {
      return this.$store.getters.course_from_course_id(this.$route.params.id)[0]
    },
    purchaseCourse () {
      return this.$store.getters.course_purchase_from_course_id(this.$route.params.id)[0] !== undefined ? true : false
    },
    CreditCard () {
      return this.$store.state.creditCard
    }
  }
}
</script>
