import { ChangeDetectionStrategy, Component, input } from '@angular/core';

type CardPadding = 'none' | 'sm' | 'md' | 'lg';

@Component({
  selector: 'almalhi-card',
  imports: [],
  templateUrl: './card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {

  padding = input<CardPadding>('md');
  hover = input<boolean>(false);
}
