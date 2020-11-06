import {transition,trigger,style,animate} from '@angular/animations';

export const flyIn =
trigger('flyIn',[
  transition('void=>*',[
    style({
      opacity:0,
      transform: 'translateY(50px)'
    }),
    animate(800)
  ])
]);



export const fadeIn = trigger('fadeIn',[

  transition('*=>void',[
    animate(500,style({
      opacity:0,
      zIndex:-1
    }))
  ])
]);

export const changeIn = trigger('changeIn',[
  transition('void =>*',[
    style({
      opacity:0,
      zIndex:-1
    }),
    animate(500)
  ]),
]);
