import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Form, Card, Icon } from '@edx/paragon';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Email } from '@edx/paragon/icons';
import { useSelector } from 'react-redux';
import messages from '../messages';
import LearningGoalButton from './LearningGoalButton';
import { saveWeeklyLearningGoal } from '../../data';
import { useModel } from '../../../generic/model-store';

function WeeklyLearningGoalCard({
  daysPerWeek,
  subscribedToReminders,
  intl,
}) {
  const {
    courseId,
  } = useSelector(state => state.courseHome);

  const {
    isMasquerading,
  } = useModel('courseHomeMeta', courseId);

  const [daysPerWeekGoal, setDaysPerWeekGoal] = useState(daysPerWeek);
  // eslint-disable-next-line react/prop-types
  const [isGetReminderSelected, setGetReminderSelected] = useState(subscribedToReminders);

  function handleSelect(days) {
    // Set the subscription button if this is the first time selecting a goal
    const selectReminders = daysPerWeekGoal === null ? true : isGetReminderSelected;
    setGetReminderSelected(selectReminders);
    setDaysPerWeekGoal(days);
    if (!isMasquerading) { // don't save goal updates while masquerading
      saveWeeklyLearningGoal(courseId, days, selectReminders);
    }
  }

  function handleSubscribeToReminders(event) {
    const isGetReminderChecked = event.target.checked;
    setGetReminderSelected(isGetReminderChecked);
    if (!isMasquerading) { // don't save goal updates while masquerading
      saveWeeklyLearningGoal(courseId, daysPerWeekGoal, isGetReminderChecked);
    }
  }

  return (
    <div className="row w-100 m-0 p-0">
      <Card className="mb-3 shadow-sm border-0" data-testid="weekly-learning-goal-card">
        <Card.Body className="p-3.5">
          <Card.Title>
            <h2 className="h4 m-0 text-primary-500">{intl.formatMessage(messages.setWeeklyGoal)}</h2>
          </Card.Title>
          <Card.Text className="text-gray-700">
            {intl.formatMessage(messages.setWeeklyGoalDetail)}
          </Card.Text>
          <div
            className="row w-100 m-0 p-0 justify-content-between"
          >
            <LearningGoalButton
              level="casual"
              currentGoal={daysPerWeekGoal}
              handleSelect={handleSelect}
            />
            <LearningGoalButton
              level="regular"
              currentGoal={daysPerWeekGoal}
              handleSelect={handleSelect}
            />
            <LearningGoalButton
              level="intense"
              currentGoal={daysPerWeekGoal}
              handleSelect={handleSelect}
            />
          </div>
          <div className="pt-3 pb-1">
            <Form.Switch
              checked={isGetReminderSelected}
              onChange={(event) => handleSubscribeToReminders(event)}
              disabled={!daysPerWeekGoal}
            >
              {intl.formatMessage(messages.setGoalReminder)}
            </Form.Switch>
          </div>
        </Card.Body>
        {isGetReminderSelected && (
          <Card.Footer className="border-0 px-2.5 bg-light-200 ">
            <div className="row w-100 m-0 small align-center">
              <div className="d-flex align-items-center pr-1">
                <Icon
                  className="text-primary-500"
                  src={Email}
                />
              </div>
              <div className="col">
                {intl.formatMessage(messages.goalReminderDetail)}
              </div>
            </div>
          </Card.Footer>
        )}
      </Card>

    </div>
  );
}

WeeklyLearningGoalCard.propTypes = {
  daysPerWeek: PropTypes.number,
  subscribedToReminders: PropTypes.bool,
  intl: intlShape.isRequired,
};

WeeklyLearningGoalCard.defaultProps = {
  daysPerWeek: null,
  subscribedToReminders: false,
};
export default injectIntl(WeeklyLearningGoalCard);
