(ns queue.main)

; Implementation

(defn push-func
  [front rear]
  (fn [& args] (queue front (apply conj rear args))))
(defn qpush
  [qu & args]
  (apply (:push qu) args))

(defn peek-func
  "Not chainable"
  [front rear]
  (fn []
    (if (seq front)
      (first front)
      (if-not (seq rear)
        nil
        (let [new-front (apply list rear)]
          (first new-front))))))
(defn qpeek
  [qu]
  ((:peek qu)))

(defn pop-func
  [front rear]
  (fn []
    (if (seq front)
      (queue (rest front) rear)
      (if-not (seq rear)
        ; (throw (IllegalStateException. "Can't pop empty list"))
        (queue front rear)
        (let [new-front (apply list rear)
              new-rear []]
          (queue (rest new-front) new-rear))))))
(defn qpop
  [qu]
  ((:pop qu)))

(defn result-func
  "Not chainable"
  [front rear]
  #(str "Front: " front ", Rear: " rear))
(defn qresult
  [qu]
  ((:result qu)))

(defn queue
  ([] (queue '() []))
  ([front rear]
   {:push   (push-func front rear)
    :peek   (peek-func front rear)
    :pop    (pop-func front rear)
    :result (result-func front rear)}))

; Testing part
; I tested it in REPL

(def q (queue))
(qresult q)
(qpeek q)
(def q1 (qpush q 10))
(qresult q1)
(def q2 (apply qpush q1 [20 30]))
(qresult q2)
(qpeek q2)
(def q3 (qpop q2))
(qresult q3)
(def q4 (qpush q3 40))
(qresult q4)
