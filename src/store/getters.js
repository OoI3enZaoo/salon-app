export default {
  course_from_course_id (state) {
    return courseId => state.course.filter(item => {
      return courseId == item.course_id
    })
  },
  course_purchase_from_course_id (state) {
    return courseId => state.purchaseCourse.filter(item => {
      return courseId == item.course_id
    })
  },
  lesson_from_course_id (state) {
    return courseId => state.lesson.filter(item => {
      return courseId == item.course_id
    })
  },
  lesson_from_lesson_id (state) {
    return lessonId => state.lesson.filter(item => {
      return lessonId == item.lesson_id
    })
  },
  favorite_from_lesson_id (state) {
    return lessonId => state.favorite.filter(item => {
      return lessonId == item.lesson_id
    })
  }
}
