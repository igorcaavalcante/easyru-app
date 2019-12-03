import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "brCurrency"
})
export class BrCurrencyPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        return this.swap(value, { ".": ",", ",": "." });
    }

    private swap(source: string, swaps): string {
        const reg = new RegExp("[" + Object.keys(swaps).join("") + "]", "g");
        return source.replace(reg, (character) => swaps[character]);
    }

}
