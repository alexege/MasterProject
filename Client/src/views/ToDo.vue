<template>
    <div>
        <main class="flexbox">
        <h2>ToDoList</h2>
        <Board id="board-1" >
            <Card id="card-1" :draggable="true">
                <p>Card One</p>
            </Card>
        </Board>
        
        <Board id="board-1" >
            <Card id="card-2" :draggable="true">
                <p>Card Two</p>
            </Card>
        </Board>
        
        <Board id="board-2" >
            <Card id="card-3" :draggable="true">
                <p>Card Three</p>
            </Card>
        </Board>
        </main>
    </div>
</template>
<script>
import Board from '../components/Board.vue';
import Card from '../components/Card.vue';
export default {
    name: 'ToDo',
    components: {
        Board,
        Card
    },
    data() {
        return {

        }
    },

    methods: {
        drop: e => {
            const card_id = e.dataTransfer.getData('card_id');

            const card = document.getElementById(card_id);

            card.style.display = "block";

            e.target.appendChild(card);
        }
    },

    mounted() {

    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.flexbox {
    display: flex;
    justify-content: space-between;

    width: 100%;
    max-width: 768px;
    height: 100vh;
    overflow: hidden;
    margin: 0 auto;
    padding: 15px;
}

.flexbox .board {
    display: flex;
    flex-direction: column;

    width: 100%;
    max-width: 300px;
    background-color: #313131;
    padding: 15px;
    margin: 15px;
}

.flexbox .card {
    min-height: 60px;
    padding: 15px 25px;
    background-color: white;

    cursor: pointer;
    margin-bottom: 15px;
    color: black;
}
</style>