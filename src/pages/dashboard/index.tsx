import { GetServerSideProps } from 'next'
import { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import styles from './styles.module.css'
import Head from 'next/head'

import { getSession } from 'next-auth/react'
import { TextArea } from '@/components/textarea'

import { FiShare2 } from 'react-icons/fi'
import { FaTrash } from 'react-icons/fa'

import { db } from '../../services/firebaseConnection'

import {
    addDoc,
    collection,
    query,
    orderBy,
    where,
    onSnapshot,
    doc,
    deleteDoc
} from 'firebase/firestore'
import Link from 'next/link'


interface HomeProps {
    user: {
        email: string;
    }
}

interface TaskProps {
    id: string;
    created: Date;
    public: string;
    tarefa: string;
    user: string;
}

export default function Dashboard({ user }: HomeProps) {
    const [input, setInput] = useState('')
    const [publicTask, setPublicTask] = useState(false)
    const [tasks, setTasks] = useState<TaskProps[]>([])

    useEffect(() => {
        async function loadTasks() {
            const tarefasRef = collection(db, 'tarefas')
            const q = query(
                tarefasRef,
                orderBy("created", "desc"),
                where("user", "==", user?.email)
            )
            onSnapshot(q, (snapshot) => {
                let lista = [] as TaskProps[];

                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        tarefa: doc.data().tarefa,
                        created: doc.data().created,
                        user: doc.data().user,
                        public: doc.data().public
                    })
                })

                setTasks(lista)
            })
        }
        loadTasks()
    }, [user?.email])

    const handleChangePublic = (event: ChangeEvent<HTMLInputElement>) => {

        console.log(event.target.checked)
        setPublicTask(event.target.checked)
    }

    const handleSubmitTask = async (event: FormEvent) => {
        event.preventDefault()

        if (input === '') return;

        try {
            await addDoc(collection(db, 'tarefas'), {
                tarefa: input,
                created: new Date(),
                user: user?.email,
                public: publicTask,
            });

            setInput('')
            setPublicTask(false)
        } catch (error) {
            console.log(error)
        }


    }

    const handleShare = async (id: string) => {
        await navigator.clipboard.writeText(
            `${process.env.NEXT_PUBLIC_URL}/task/${id}`
        )
    }

    const handleDelete = async (id: string) => {
        const docRef = doc(db, "tarefas", id)
        await deleteDoc(docRef)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Meu painel de tarefas</title>
            </Head>
            <main className={styles.main}>
                <section className={styles.content}>
                    <div className={styles.contentForm}>
                        <h1 className={styles.title}>Tarefa do dia...</h1>
                        <form onSubmit={handleSubmitTask}>
                            <TextArea
                                value={input}
                                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setInput(event.target.value)}
                                placeholder='Digite a sua tarefa aqui...'
                            />
                            <div className={styles.checkboxArea}>
                                <input className={styles.checkbox}
                                    type='checkbox'
                                    checked={publicTask}
                                    onChange={handleChangePublic}
                                />
                                <label>Deixar tarefa publica?</label>
                            </div>
                            <button className={styles.button} type='submit'>Registrar</button>
                        </form>
                    </div>
                </section>

                <section className={styles.taskContainer}>
                    <h1>Minhas Tarefas</h1>
                    {
                        tasks.map((item) => (
                            <article key={item.id} className={styles.task}>
                                {item.public && (
                                    <div className={styles.tagContainer}>
                                        <label className={styles.tag}>Publico</label>
                                        <button className={styles.shareButton} onClick={() => handleShare(item.id)}>
                                            <FiShare2 className={styles.FiShare2}
                                                size={22}
                                            />
                                        </button>
                                    </div>
                                )}

                                <div className={styles.taskContent}>
                                    {item.public ? (
                                        <Link href={`/task/${item.id}`}>
                                            <p>{item.tarefa}</p>
                                        </Link>
                                    ) : (
                                        <p>{item.tarefa}</p>
                                    )}
                                    <button className={styles.trashButton} onClick={() => handleDelete(item.id)}>
                                        <FaTrash
                                            size={22}
                                            color="red"
                                        />
                                    </button>
                                </div>
                            </article>
                        ))
                    }
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
        props: {
            user: {
                email: session?.user.email,
            },
        },
    }
}