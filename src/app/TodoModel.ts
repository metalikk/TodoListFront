export interface ITodoModel {
    todo: string;
    todos: string;
}


export class TodoModel {
    _id: string;
    // definition d'un attribut reprenant les propriétés de ITodoModel[PROPRIETE];
    todo?: ITodoModel['todo'];
    todos?: ITodoModel['todos'];

    // Constructeur pour instancier un nouvel object TodoModel prenant un object en paramètre de type ITodomodel
    constructor(item: ITodoModel) {
        this._id = null;
        this.todo = null;
        this.todos = null;

        // Assigné les valeurs de item dans notre instance de classe 'this'
        Object.assign(this, item, {});
    }

}