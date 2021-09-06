const Tools = {
    getRandom(_min, _max) {
        return Math.floor(Math.random() * (_max - _min) + _min);
    },

    isCollide(_obj, _obj2) {
        var right = _obj.x + _obj.w,
            left = _obj.x,
            top = _obj.y,
            bottom = _obj.y + _obj.h;
        if (!(
            right >= _obj2.x
            && left <= _obj2.x + _obj2.w
            && top <= _obj2.y + _obj2.h
            && bottom >= _obj2.y
        )) {
            return false;
        }
        return true;
    },

    sum(...args) {
        const nums = [...args];
        const result = nums.reduce((_acc, _val) => {
            return _acc + _val;
        }, 0);
        return result;
    },

    checkCollision(obj0, obj1) {
        if (rectIntersect(obj0, obj1)) {
            return true;
        }
        return false;
    }
}

function rangeIntersect(min0, max0, min1, max1) {
    return Math.min(min1, max1) <= Math.max(min0, max0) &&
        Math.min(min0, max0) <= Math.max(min1, max1);
}
function rectIntersect(r0, r1) {
    return rangeIntersect(r0.x, r0.x + r0.w, r1.x, r1.x + r1.w) &&
        rangeIntersect(r0.y, r0.y + r0.h, r1.y, r1.y + r1.h);
}

export { Tools };