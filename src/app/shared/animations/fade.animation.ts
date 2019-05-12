import { trigger, transition, style, animate } from '@angular/animations';

const ANIMATION_DURATION = 250;

const fadeIn = {
  opacity: 0
};

const fadeOut = {
  opacity: '*'
};

export const fadeTrigger = trigger('fade', [
  transition(':enter', [
    style(fadeIn),
    animate(ANIMATION_DURATION, style(fadeOut))
  ]),
  transition(':leave', [
    style(fadeOut),
    animate(ANIMATION_DURATION, style(fadeIn))
  ])
]);
