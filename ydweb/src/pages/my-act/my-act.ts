import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the MyActPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-act',
  templateUrl: 'my-act.html',
})
export class MyActPage {

  choose: string = 'myself';

  myactitems = [];
  actitems = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: HTTP,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyActPage');
    var empty = document.getElementById('empty');
    if (this.myactitems.length == 0) {
      empty.style.display = 'block';
    } else {
      empty.style.display = 'none';
    }
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter MyActPage');
    this.request();

    var empty = document.getElementById('empty');
    if (this.myactitems.length == 0) {
      empty.style.display = 'block';
    } else {
      empty.style.display = 'none';
    }

  }

  // 下拉刷新
  doRefresh(refresher) {
    console.log('下拉刷新-我的运动-begin', refresher);

    this.request();

    setTimeout(() => {
      console.log('下拉刷新-我的运动-ended');
      refresher.complete();
    }, 2000);
  }

  request() {

    var userId = localStorage.getItem('userID');


    // 我发起的活动--请求
    this.http.post('http://39.107.66.152:8080/mine/myAddAct', {
      userID: userId
    }, {}).then(res => {
      console.log('我发起的活动-请求：', res['data']);

      var data = JSON.parse(res['data']);

      // UTC时间处理
      for (var i in data) {
        var empty = document.getElementById('empty');

        console.log('MyActPage-UTC时间转换调试：', data[i]['actTime']);

        var actTime = new Date(data[i]['actTime']);
        data[i]['actTime'] = actTime.toLocaleString();

        var actCutOffTime = new Date(data[i]['actCutOffTime']);
        data[i]['actCutOffTime'] = actCutOffTime.toLocaleString();

        console.log('MyActPage-UTC时间转换调试：', data[i]['actTime'], data[i]['actCutOffTime']);

        this.myactitems[i] = data[i];

        if (this.myactitems.length == 0) {
          empty.style.display = 'block';
        } else {
          empty.style.display = 'none';
        }

      }

    }).catch(err => {
      console.log('MyActPage-发起活动请求错误码：', err.status);

      for (var i in err) {
        console.log('MyActPage-发起活动请求报错：', err[i]);
        for (var k in err[i]) {
          console.log(err[i].k, err[i][k]);
        }
      }
    }); 

  }

  // 跳转活动详情页
  goAct(item){
    this.navCtrl.push('AboutActPage',item);
  }

  // 跳转发起活动页
  goAboutUp() {
    this.navCtrl.push('AboutUpPage');
  }

  // // 参加活动
  // actitems=[
  //   {imgs:'assets/imgs/launch1.jpg',name:'荧光夜跑',position:'河北师范大学风雨操场',stime:'5月3日19:00',payway:'AA',number:'不限',etime:'6月3日21:00'},
  //   {imgs:'assets/imgs/launch1.jpg',name:'荧光夜跑',position:'河北师范大学风雨操场',stime:'5月3日19:00',payway:'AA',number:'不限',etime:'6月3日21:00'},
  //   {imgs:'assets/imgs/launch1.jpg',name:'荧光夜跑',position:'河北师范大学风雨操场',stime:'5月3日19:00',payway:'AA',number:'不限',etime:'6月3日21:00'},
  //   {imgs:'assets/imgs/launch1.jpg',name:'荧光夜跑',position:'河北师范大学风雨操场',stime:'5月3日19:00',payway:'AA',number:'不限',etime:'6月3日21:00'},
  //   {imgs:'assets/imgs/launch1.jpg',name:'荧光夜跑',position:'河北师范大学风雨操场',stime:'5月3日19:00',payway:'AA',number:'不限',etime:'6月3日21:00'}
  // ]

}
