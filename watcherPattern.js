class Watcher {
  constructor() {
    this._watcherList = [];
  }
  $on(name, fn) {
    this._watcherList.push({
      name,
      fn
    });
  }
  $emit(name, payload) {
    this._watcherList.forEach(item => {
      if (item.name !== name) return;
      item.fn(payload);
    });
  }
  $off(name, fn) {
    this._watcherList = this._watcherList.filter((item, index) => {
      if (item.name === name && item.fn === fn) {
        return false;
      }
      return true;
    });
  }
}

var watcher = new Watcher();


class People {
  constructor(name) {
    this.name = name;
  }
}

class Teacher extends People {
  constructor(name, id) {
    super(name);
    this.id = id || 0;
    this.class = Teacher;
  }
  faZuoYe() {
    watcher.$emit('zuoye', {
      zuoye: '背诗'
    });
  }
}

class Student extends People {
  constructor(name) {
    super(name);
    this.class = Student;
    this.zuoye = null;
    watcher.$on('zuoye', this.shouZuoYe.bind(this));
  }
  shouZuoYe(payload) {
    this.zuoye = payload.zuoye;
  }
}

var t = new Teacher();

var s = new Student();

t.faZuoYe();
