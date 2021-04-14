import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = props => (
    <div className="abs-center wd-xl">
        <div className="text-center mb-4">
            <div className="text-lg mb-3">404</div>
            <p className="lead m-0">Sayfa Bulunamadı.</p>
            <p>Aradığınız sayfa bulunmamaktadır.</p>
        </div>
        
        <ul className="list-inline text-center text-sm mb-4">
            <li className="list-inline-item">
                <Link to="" className="text-muted">Uygulamaya Dön</Link>
            </li>
            <li className="text-muted list-inline-item">|</li>
            <li className="list-inline-item">
                <Link to="/giris-yap" className="text-muted">Giriş Yap</Link>
            </li>
        </ul>
    </div>
)

export default NotFound;

