<script lang="ts">
    import Vue from 'vue';
    export default Vue.extend({
        mpType: 'app',
        onLaunch() {
            const my__token = uni.getStorageSync('my__token')

            if(my__token){
                uni.reLaunch({
                    url:'/pages/home/home'
                })
            }
        },
        onShow() {
            // console.log('App Show')
        },
        onHide() {
            console.log('App Hide')
        }
    });
</script>

<style>
    /*每个页面公共css */
    page{
        background-color: #f8f8f8;
        height: 100%
    }
</style>
