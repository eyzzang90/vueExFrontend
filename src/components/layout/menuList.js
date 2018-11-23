export const menuList = {

  data(){
    return {
      menuList: [
        {
          href: '/',
          title: 'main',
          icon: 'fa fa-home'
        },
        {
          href: '/weather',
          title: 'weather',
          icon: 'weather'
        },
        {
          href: '/canvas',
          title: 'canvas',
          icon: 'canvas',
          child: [
            {
              href: '/canvas/canvas3',
              title: 'canvas3',
              icon: 'canvas3',
            },
            {
              href: '/canvas/canvas4',
              title: 'canvas4',
              icon: 'canvas4',
            }
          ]
        },
        {
          href: '/movie',
          title: 'movie',
          icon: 'movie',
          child: [
            {
              href: '/movie2',
              title: 'movie2',
              icon: 'movie2',
            },
            {
              href: '/movie3',
              title: 'movie3',
              icon: 'movie3',
            }
          ]
        },
        {
          href: '/tournament',
          title: 'tournament',
          icon: 'tournament'
        }
      ],
    }
  },
  methods: {
    hello(){
      console.log('ggg')
    }
  }

}
