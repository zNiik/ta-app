import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Quantity } from 'src/app/shared/interfaces/quantity.interface';

@Component({
  selector: 'nmo-quantity-select',
  templateUrl: './quantity-select.component.html',
  styleUrls: ['./quantity-select.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class QuantitySelectComponent implements OnInit, OnChanges  {
  private _defaultValue: Partial<Quantity> = {
    format: '1.0',
    suffix: '',
  };

  @Input() quantity!: Quantity;
  @Input() loading = false;
  @Output() quantityChange = new EventEmitter<number>();

  selected!: string;
  quantities: string[] = [];

  constructor(private decimal: DecimalPipe) { }

  ngOnInit(): void {
    this.applySelected();
  }

  ngOnChanges(changes: SimpleChanges) {
    const { quantity: { firstChange, currentValue: { selected } } } = changes;
    if (!firstChange) {
      this.selected = this.formatNumber(selected) as string;
    }
  }

  applySelected() {
    this.quantity = { 
      ...this._defaultValue,
      ...this.quantity,
      selected: this.quantity?.selected || this.quantity?.min
    };

    this.selected = this.formatNumber(this.quantity.selected as number) as string;
    this.buildQuantities();
  }

  buildQuantities() {
    this.quantities = [];

    for (let i = this.quantity.min; i <= this.quantity.max; i += this.quantity.incrementBy) {
      this.quantities.push(this.formatNumber(i) as string);
    }
  }

  formatNumber(num: number) {
    return this.decimal.transform(num, this.quantity.format);    
  }

  getQuantityLabel(quantity: string) {
    return `${quantity} ${this.quantity.suffix}`;
  }

  onModelChange(quantity: string) {
    this.quantityChange.emit(+quantity);
  }
}
