class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class SelfOrganizedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    insert(data) {
        let new_node = new Node(data);
        if (this.head == null) {
            this.head = new_node;
        }
        else {
            this.tail.next = new_node;
            new_node.prev = this.tail;
        }
        this.tail = new_node;
        this.length++;
    }

    size() {
        return this.length;
    }

    findNodeByIndex(index) {
        if (index < 0 || index >= this.length) {
            return null;
        }
        let current_node = this.head;
        let counter = 0;
        while (current_node != null) {
            if (index == counter) {
                return current_node;
            }
            current_node = current_node.next;
            ++counter;
        }
        return null;
    }

    at(index) {
        let node = this.findNodeByIndex(index);
        if (node != null) {
            return node.data;
        }
        return null;
    }

    findNode(data) {
        let currentNode = this.head;

        while (currentNode != null) {
            if (currentNode.data === data) {
                return currentNode;
            }
            currentNode = currentNode.next;
        }
        return currentNode;
    }

    toArray() {
        let elements = [];
        let currentNode = this.head;
        while (currentNode != null) {
            elements.push(currentNode.data);
            currentNode = currentNode.next;
        }
        return elements;
    }

    removeAt(index) {
        let del_node = this.findNodeByIndex(index);
        if (del_node != null) {
            if (del_node.next != null) {
                del_node.next.prev = del_node.prev;
            }
            else {
                this.tail = del_node.prev;
            }

            if (del_node.prev != null) {
                del_node.prev.next = del_node.next;
            }
            else {
                this.head = del_node.next;
            }
            this.length--;
        }
    }

    moveToFront(node) {
        if (node == this.head) {
            return;
        }

        if (node == this.tail) {
            this.tail = this.tail.prev;
            this.tail.next = null;
            node.next = this.head;
            node.prev = null;
            this.head.prev = node;
            this.head = node;
        }

        else {
            node.prev.next = node.next;
            node.next.prev = node.prev;
            let head_ = this.head;
            this.head.prev = node;
            this.head = node;
            this.head.prev = null;
            this.head.next = head_;
        }
    }

    reorganize(data) {
        let current_node = this.findNode(data);
        if (current_node != null) {
            this.moveToFront(current_node);
            return true;
        }
        return false;
    }

}

module.exports = {
    SelfOrganizedList,
    Node
};
