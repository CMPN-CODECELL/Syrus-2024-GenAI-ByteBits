import Head from 'next/head';
import styles from '../styles/videoToQuiz.css'; // Import CSS module

export default function VideoToQuiz() {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <div className={styles.container}>
            
            <div className={styles.loader}>
                <dialog className={styles.modal}>
                    {/* <img src="/asset/img/load.gif" height="auto" width="auto" alt="" /> */}
                    <p>Please wait! Your Quiz is being generated</p>
                </dialog>
                
                <form className={styles.hero_section} method="post" id="form" action="/createQuizFromVideo">
                    <h2>Video to QUIZ </h2>
                    <div className={styles.input_area}>
                        <h3>Enter the Youtube Link here !</h3>
                        <textarea name="videoLink" id="videoLink" cols="30" rows="1" resize="no" required></textarea>
                    </div>
                    <div className={styles.difficulty}>
                        <h3>Set difficulty !</h3>
                        <div>
                            <input type="radio" name="difficulty" id="easy" value="1" /><label htmlFor="easy">Easy</label>
                            <input type="radio" name="difficulty" id="medium" value="2" /><label htmlFor="medium">Medium</label>
                            <input type="radio" name="difficulty" id="hard" value="3" /><label htmlFor="hard">Hard</label>
                        </div>
                    </div>
                    <button type="submit" name="promptType" id="submit_button" value="1">Generate</button>
                </form>
               
            </div>
        </div>
    );
}
