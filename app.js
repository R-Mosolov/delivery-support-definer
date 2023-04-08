/**
 * Листинг функции взят из статьи 
 * https://habr.com/ru/post/566474/
 * и адаптирован под задачу бизнеса
 */

const isDeliverySupported = (clientLatitude, clientLongitude) => {
    const EART_RADIUS = 6371210; // Радиус земли
    const DISTANCE = 7000; // Интересующее нас расстояние
    const BASE_LATITUDE = 55.793716; // Точка отсчёта широты (центр города, Бутлерова, 44)
    const BASE_LONGITUDE = 49.139181; // Точка отсчёта долготы (центр города, Бутлерова, 44)
    
    const isSupported = (baseLat, aroundCoord, clientCoord) => {
        if (
            (baseLat + aroundCoord) > clientCoord
            && (baseLat - aroundCoord) < clientCoord
        ) {
            return true;
        } else {
            return false;
        }
    }

    //https://en.wikipedia.org/wiki/Longitude#Length_of_a_degree_of_longitude
    const computeDelta = (degrees) => {
        return Math.PI / 180 * EART_RADIUS * Math.cos(deg2rad(degrees));
    }

    const deg2rad = (degrees) => {
        return degrees * Math.PI / 180;
    }

    const deltaLat = computeDelta(BASE_LATITUDE); //Получаем дельту по широте
    const deltaLon = computeDelta(BASE_LONGITUDE); // Дельту по долготе

    const aroundLat = DISTANCE / deltaLat; // Вычисляем диапазон координат по широте
    const aroundLon = DISTANCE / deltaLon; // Вычисляем диапазон координат по долготе

    if (
        isSupported(BASE_LATITUDE, aroundLat, clientLatitude)
        && isSupported(BASE_LONGITUDE, aroundLon, clientLongitude)
    ) {
        console.log('Delivery is supported');
        return true;
    } else {
        console.log('Delivery is NOT supported');
        return false;
    }
};

const clientLatitude = 55.906738; // Координаты широты покупателя
const clientLongitude = 49.448862; // Координаты долготы покупателя
isDeliverySupported(clientLatitude, clientLongitude);