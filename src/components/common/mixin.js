export const itemMixin = {
  methods : {
    toggleDropdown(e) {
      e.preventDefault();
      this.show = !this.show
    },
    closeDropdown(){
      this.show = false;
    },
    clickEvent(e){
      if(this.item.child){
        this.toggleDropdown(e);
      }
    },

  },
  computed: { //★★★ methods와의 차이점. 종속 대상을 따라 저장(캐싱) 된다
              //해당 속성이 종속된 대상이 변경될 때만 함수를 실행.  (watch와 비슷하지만, watch는 개별 prop에 반응)
    isRouterLink(){
      return this.$router && this.item && this.item.href !== undefined
    },
    isLinkActive(){
      if(this.item && this.item.href){
        return this.item.href == window.location.pathname;
      }
    },
    checkShowEvent(){
      if(this.show){
        return true;
      }else{
        return false;
      }
    }
  }
}
