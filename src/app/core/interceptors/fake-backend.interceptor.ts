import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { delay, mergeMap, materialize, dematerialize } from "rxjs/operators";
import { User } from '../../shared/interfaces/user.interface';
import mockProducts from './mocks/products.json';
import { Product } from "src/app/shared/interfaces/products.interface";

let users: User[] = [{
    id: 1,
    firstName: 'Nikko',
    lastName: 'Ong',
    password: 'demo',
    username: 'demo'
}];

const localStorageUsers = localStorage.getItem('users');
const localStorageProducts = localStorage.getItem('products');

if (!localStorageUsers) {
    localStorage.setItem('users', JSON.stringify(users));
}

if (!localStorageProducts) {
    localStorage.setItem('products', JSON.stringify(mockProducts));
}

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());
        
        function handleRoute() {
            switch(true) {
                case url.endsWith('/auth') && method === 'POST':
                    return authenticate();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                case url.endsWith('/products') && method === 'GET':
                    return getProducts();
                case url.endsWith('/products') && method === 'DELETE':
                    return deleteProducts();
                case url.match(/\/products\/\d+$/) && method === 'PUT':
                    return updateProductQuantity();
                default:
                    return next.handle(request);
            }
        }

        function authenticate() {
            const { username, password } = body;
            const user = users.find(u => u.username === username && u.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                token: 'fake-jwt-token',
                user: {
                    id: user.id,
                    addresses: [],
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                }
            })
        }

        function getUserById() {
            if (!isLoggedIn()) return unauthorized();
            const user = users.find(x => x.id == idFromUrl());
            return ok(user);
        }

        function getProducts() {
            if (!isLoggedIn()) return unauthorized();
            return ok(JSON.parse(localStorage.getItem('products') as string));
        }

        function deleteProducts() {
            if (!isLoggedIn()) return unauthorized();

            const { ids } = body;
            const products = [...JSON.parse(localStorage.getItem('products') as string)]
                .filter((p: Product) => ids.indexOf(p.id) < 0);

            localStorage.setItem('products', JSON.stringify(products));

            return ok();
        }

        function updateProductQuantity() {
            if (!isLoggedIn()) return unauthorized();

            const { quantity } = body; 
            const products = [...JSON.parse(localStorage.getItem('products') as string)];
            const productIndex = products.findIndex(u => u.id === idFromUrl());

            products[productIndex] = {
                ...products[productIndex],
                quantity: {
                    ...products[productIndex].quantity,
                    selected: quantity
                }
            };

            localStorage.setItem('products', JSON.stringify(products));

            return ok(products[productIndex]);
        }

        function ok(body?: any) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorized' } });
        }
        
        function error(message: string) {
            return throwError({ message });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};