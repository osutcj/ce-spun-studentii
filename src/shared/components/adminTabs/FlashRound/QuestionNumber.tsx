import {useRef, useState, useEffect} from "react"

const QuestionNumber = (props: any) => {
    const { updateFields } = props;

    const [questionNum, setQustionNum] = useState<number>(5);

    useEffect(() => {
        if (props.questionNumber && !isNaN(parseInt(props.questionNumber))) {
            setQustionNum(props.questionNumber);
        }
      }, []);

}

export default QuestionNumber;