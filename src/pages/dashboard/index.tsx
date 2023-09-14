import { GetServerSideProps } from 'next'
import styles from './styles.module.css'
import Head from 'next/head'

import { getSession } from 'next-auth/react'
import { TextArea } from '@/components/textarea'

import {FiShare2} from 'react-icons/fi'
import {FaTrash} from 'react-icons/fa'

export default function Dashboard() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Meu painel de tarefas</title>
            </Head>
            <main className={styles.main}>
                <section className={styles.content}>
                    <div className={styles.contentForm}>
                        <h1 className={styles.title}>Tarefa do dia...</h1>
                        <form>
                            <TextArea
                                placeholder='Digite a sua tarefa aqui...'
                            />
                            <div className={styles.checkboxArea}>
                                <input className={styles.checkbox}
                                type='checkbox' />
                                <label>Deixar tarefa publica?</label>
                            </div>
                            <button className={styles.button} type='submit'>Registrar</button>
                        </form>
                    </div>
                </section>

                <section className={styles.taskContainer}>
                    <h1>Minhas Tarefas</h1>
                    <article className={styles.task}>
                        <div className={styles.tagContainer}>
                            <label className={styles.tag}>Publico</label>
                            <button className={styles.shareButton}>
                                <FiShare2
                                    size={22}
                                    color="#2f4f4f"
                                />
                            </button>    
                        </div>
                        <div className={styles.taskContent}>
                            <p>Primeira tarefa</p>
                            <button className={styles.trashButton}>
                                    <FaTrash 
                                        size={22}
                                        color="red"
                                    />
                            </button>
                        </div>
                    </article>


                    
                </section>
            </main>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req })

    if (!session?.user) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {},
    }
}