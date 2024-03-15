import React, { useEffect } from 'react';

const HousesMap = () =>
{
    useEffect(() =>
    {
        const loadMap = async () => {
            const g = await import('google.maps');
            const { key, v } = {
                key: 'AIzaSyCTn43PNns-J3NQPLY-GAcyoJ7RPT9P8IU',
                v: 'weekly',
            };

            let h, a, k, p = 'The Google Maps JavaScript API',
                c = 'google',
                l = 'importLibrary',
                q = '__ib__',
                m = document,
                b = window;
            b = b[c] || (b[c] = {});
            const d = b.maps || (b.maps = {});
            const r = new Set();
            const e = new URLSearchParams();
            const u = () =>
                h ||
                (h = new Promise(async (f, n) => {
                    await (a = m.createElement('script'));
                    e.set('libraries', [...r] + '');
                    for (k in g) e.set(k.replace(/[A-Z]/g, t => '_' + t[0].toLowerCase()), g[k]);
                    e.set('callback', c + '.maps.' + q);
                    a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
                    d[q] = f;
                    a.onerror = () => (h = n(Error(p + ' could not load.')));
                    a.nonce = m.querySelector('script[nonce]')?.nonce || '';
                    m.head.append(a);
                }));
            if (d[l]) {
                console.warn(p + ' only loads once. Ignoring:', g);
            } else {
                d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n));
            }

            // Dynamically load listingsOnMap.js module
            const module = await import('../lib/listingsOnMap.js');
            module.default(); // Invoke the default function from the module
        };

        loadMap().then(() => {});
    }, []);

    return (
        <div id="map" style={{ height: '100%' }}>
            <style>{`
        /* CSS styles */
        #map {
          height: 100%;
        }

        /* Optional: Makes the sample page fill the window. */
        html,
        body {
          height: 100%;
          margin: 0;
          padding: 0;
        }

        /* HTML marker styles */
        .price-tag {
          background-color: #4285F4;
          border-radius: 8px;
          color: #FFFFFF;
          font-size: 14px;
          padding: 10px 15px;
          position: relative;
        }

        .price-tag::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 100%;
          transform: translate(-50%, 0);
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid #4285F4;
        }
      `}</style>
        </div>
    );
};

export default HousesMap;