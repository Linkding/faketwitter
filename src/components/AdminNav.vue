<template>
    <div :style="{width:width}" class="nav-side">
        <router-link class="nav-item" to="/admin/user">用户管理</router-link>
        <router-link class="nav-item" to="/admin/tweet">微博管理</router-link>
    </div>
</template>

<script>
    import "../css/sidenav.css";
    export default {
       props:{
            width:[ 'width' ],
       } 
    }
</script>

<style scoped>
    .router-link-active {
        background: #4CB6C2;
        color: #fff;
        box-shadow: 3px 3px 5px rgba(0, 0, 0, .05)
    }

</style>
