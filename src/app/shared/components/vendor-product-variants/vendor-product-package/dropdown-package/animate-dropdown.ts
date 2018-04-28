import { trigger, style, transition, animate, keyframes, query, stagger, group, state, animateChild } from '@angular/animations';

export const Animations = {
  animateTrigger: trigger('ngIfAnimation', [
    transition(':enter', [   // :enter is alias to 'void => *'
      style({opacity: 0, height: 0 }),
      animate(500, style({ opacity: 1, height: '200px' }))
    ]),
    transition(':leave', [   // :leave is alias to '* => void'
      animate(500, style({ opacity: 0, height: 0 }))
    ])
  ])

}
