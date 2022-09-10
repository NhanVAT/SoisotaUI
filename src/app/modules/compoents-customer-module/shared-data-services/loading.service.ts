import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class LoadingService {
    private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    get isLoading(): Observable<boolean> {
        return this._isLoading.asObservable();
    }

    public startLoading(): void {
        // if (!this.isIgnore) {
        //     this._isLoading.next(true);
        // } else {
        //     this._isLoading.next(false);
        // }
        this._isLoading.next(true);
    }

    public stopLoading(): void {
        this._isLoading.next(false);
    }
}
