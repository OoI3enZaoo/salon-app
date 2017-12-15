<template>
  <div>
    <toolbar :title="course.title" link="/home"></toolbar>
            <v-card>
              <!-- <d-player :video="{url : 'http://172.104.189.169:4400/api/getfile/' + course.video, pic: course.cover}"
                            :contextmenu="contextmenu"
                            :screenshot="true"
                            ref="player">
                  </d-player> -->

                  <my-video ref="myvideo" id="myvideo" :videoname="course.video" :options="video.options"></my-video>
              <v-card-actions>
                <!-- <v-icon>remove_red_eye</v-icon>&nbsp; <span>{{course.view}}</span> &nbsp;&nbsp; -->
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
            </v-card>
            <v-card class="ma-2">
              <v-card-text>
                <div class="text-xs-left">
                  <p class="subheading" style="display:inline;"><b>ในคอร์สจะประกอบไปด้วย</b></p>
                  <div class="mt-1">
                  <template v-for="data in courseFor">
                    <v-icon>card_giftcard</v-icon>&nbsp;{{data.for_des}}<br>
                  </template>
                  </div>
                </div>
              </v-card-text>
            </v-card>

            <v-card class="mt-3 ma-2">
              <v-card-text>
                <div class="text-xs-left">
                  <p class="subheading" style="display:inline;"><b>สิ่งที่ผู้เรียนจะได้รับ</b></p>
                  <div class="mt-1">
                    <template v-for="data in courseReceive">
                      <v-icon color="primary">done</v-icon>&nbsp;{{data.receive_des}}<br>
                    </template>
                  </div>
                </div>
              </v-card-text>
            </v-card>


            <v-card class="mt-3 ma-2">
              <v-card-text>
                <div class="text-xs-left">
                  <p class="subheading" style="display:inline;"><b>รายละเอียด</b></p>
                  <div class="mt-1">
                    <p v-html="course.description"></p>
                  </div>
                </div>
              </v-card-text>
            </v-card>


            <v-card class="mt-3 ma-2">
              <v-card-text>
                <div class="text-xs-left">
                  <p class="subheading" style="display:inline;"><b>คอร์สนี้มีไว้สำหรับ</b></p>
                  <div class="mt-1">
                    <template v-for="data in courseInclude">
                      <v-icon color="primary">done</v-icon>&nbsp;{{data.include_des}}<br>
                    </template>
                  </div>
                </div>
              </v-card-text>
            </v-card>


            <v-card class="mt-3 ma-2">
              <v-card-text>
                <div class="text-xs-left">
                  <p class="subheading" style="display:inline;"><b>เกี่ยวกับผู้สอน</b></p>
                  <div class="mt-1">
                    <div class="row">
                      <div class="col-3">
                        <v-avatar tile size="70px">
                          <img :src="course.avatar" alt="">
                        </v-avatar>
                        <p>{{course.fname}} {{course.lname}}</p>
                      </div>
                      <div class="col-9">
                          ปี 2545 เปิดโรงเรียนสอนเสริมสวย เอกมงคล ที่ ฟิวเจอร์พาร์คบางแค ในปี 2548 เป็นผู้ก่อตั้งสมาคมส่งเสริม เสริมความงาม ปัจจุบันดำรงค์ตำแหน่ง นายกสมาคมส่งเสริม เสริมความงาม (ประเทศไทย) ในปี2550 เป็นผู้บริหารร้านบิ๊กคัทสาขามาบุญครอง ในปี 2552 เปิดร้าน สมชาย เกย์คัท ที่สีลม ได้รับเชิญเป็นคณะกรรมการตัดสินการจัดงานแข่งชิงแชมป์ผมมาแล้วทุกสมาคม

                      </div>
                    </div>
                  </div>
                </div>
              </v-card-text>
            </v-card>


            <v-card class="elevation-0" style="background-color:#EEEEEE;">
                <v-card-text>
                  <template v-if="purchaseCourse">
                    <v-btn primary block @click.native="CourseInfo(course.course_id)">หน้าจัดการคอร์ส</v-btn>
                  </template>
                  <template v-else-if="!purchaseCourse && $store.state.isLogin == true">
                    <!-- <div class="form">
                        <form ref="omiseform" name="checkoutForm" method="POST" :action="'http://172.104.189.169:4200/checkout/' + course.course_id +'/' + $store.state.profile.user_id + '/' + course.price">
                        <v-btn primary block class="checkout-button-1" type="submit" id="checkout-button-1" ref="cbutton1"><v-icon dark>shopping_cart</v-icon>&nbsp;ซื้อตอนนี้</v-btn>
                      </form>
                    </div> -->
                    <v-btn block @click.native="dialog=true" primary>ซื้อตอนนี้</v-btn>
                    <v-text-field solo type="number"v-model="userRecommened" label="ไอดีของผู้แนะนำ">ไอดีผู้แนะนำ</v-text-field>
                  </template>

                  <template v-else-if="$store.state.isLogin == false || $store.state.isLogin == undefined">
                    <v-card>
                      <v-card-text>เฉพาะสมาชิกเท่านั้น</v-card-text>
                    </v-card>
                  </template>
              </v-card-text>
            </v-card>
            <v-dialog v-model="dialog" max-width="290" style="z-index:3;">
              <v-card>
                <v-card-title class="headline">Salon Academy</v-card-title>
                <v-card-text>ในตอนนี้ระบบชำระเงินยังไม่สามารถใช้งานได้ หากต้องการซื้อในตอนนี้โปรดติดต่อแอดมินที่ Salonacademy2560@gmail.com หรือ 0827938267</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">ตกลง</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

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
      dialog: false,
      contextmenu: [
          {
              text: 'GitHub',
              link: 'https://github.com/MoePlayer/vue-dplayer'
          }
      ],
      userRecommened: '',
      video: {
        options: {
            autoplay: false,
            volume: 0.6,
            poster: this.$store.getters.course_from_course_id(this.$route.params.id)[0].cover
        }
      }
    }
  },
  mounted () {
    this.$options.sockets.purchase = (data) => {
      data.price = this.course.price
      console.log('data: ' + JSON.stringify(data))
      this.$store.dispatch('purchaseCourse', data)
      this.$store.dispatch('pullLesson', data.course_id)
      if (this.userRecommened !== '' && this.userRecommened != data.user_id) {
        this.$store.dispatch('addUserRecommend', this.userRecommened)
        this.$store.dispatch('updateToUserRecommend', this.userRecommened)
      }
    }
    OmiseCard.configure({
      publicKey:        'pkey_test_5a4llhtmzdkywinaz6s',
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
    },
    courseFor () {
      return this.$store.getters.getCourseFor(this.$route.params.id)
    },
    courseInclude () {
      return this.$store.getters.getCourseInclude(this.$route.params.id)
    },
    courseReceive () {
      return this.$store.getters.getCourseReceive(this.$route.params.id)
    }
  }
}
</script>
<style scoped>
/*ul {
list-style: none;
}

ul li:before {
content: '✓';
}*/
</style>
