import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@edx/paragon';

function CheckpointActionRow({
  advanceButtonText,
  dismissButtonText,
  endButtonText,
  isLastCheckpoint,
  onAdvance,
  onDismiss,
  onEnd,
}) {
  return (
    <div className="d-flex justify-content-end">
      {!isLastCheckpoint && (
        <Button
          variant="tertiary"
          size="sm"
          className="mr-2"
          onClick={onDismiss}
        >
          {dismissButtonText}
        </Button>
      )}
      <Button
        variant="primary"
        size="sm"
        onClick={isLastCheckpoint ? onEnd : onAdvance}
      >
        {isLastCheckpoint ? endButtonText : advanceButtonText}
      </Button>
    </div>
  );
}

CheckpointActionRow.defaultProps = {
  advanceButtonText: '',
  dismissButtonText: '',
  endButtonText: '',
  isLastCheckpoint: false,
  onAdvance: null,
  onDismiss: null,
  onEnd: null,
};

CheckpointActionRow.propTypes = {
  advanceButtonText: PropTypes.string,
  dismissButtonText: PropTypes.string,
  endButtonText: PropTypes.string,
  isLastCheckpoint: PropTypes.bool,
  onAdvance: PropTypes.func,
  onDismiss: PropTypes.func,
  onEnd: PropTypes.func,
};

function CheckpointBreadcrumbs({ currentIndex, totalCheckpoints }) {
  if (totalCheckpoints === 1) {
    return null;
  }
  return (
    <span className="d-flex align-items-center">
      {new Array(totalCheckpoints).fill(0).map((v, i) => (
        <svg key="checkpoint-popover_breadcrumb" role="img" width="14px" height="14px" viewBox="0 0 14 14" className="ml-1">
          {i === currentIndex ? <circle className="checkpoint-popover_dot_active" cx="7" cy="7" r="3px" />
            : <circle className="checkpoint-popover_dot_inactive" cx="7" cy="7" r="2.5px" />}
        </svg>
      ))}
    </span>
  );
}

CheckpointBreadcrumbs.defaultProps = {
  currentIndex: null,
  totalCheckpoints: null,
};

CheckpointBreadcrumbs.propTypes = {
  currentIndex: PropTypes.number,
  totalCheckpoints: PropTypes.number,
};

function CheckpointBody({ children }) {
  if (!children) {
    return null;
  }

  return (
    <div className="text-gray-700 mb-3.5">
      {children}
    </div>
  );
}

CheckpointBody.defaultProps = {
  children: null,
};

CheckpointBody.propTypes = {
  children: PropTypes.node,
};

function CheckpointTitle({ children }) {
  if (!children) {
    return null;
  }

  return (
    <div className="h3 mb-0 mr-2.5">
      {children}
    </div>
  );
}

CheckpointTitle.defaultProps = {
  children: null,
};

CheckpointTitle.propTypes = {
  children: PropTypes.node,
};

function Checkpoint({
  advanceButtonText,
  body,
  dismissButtonText,
  endButtonText,
  index,
  onAdvance,
  onDismiss,
  onEnd,
  title,
  totalCheckpoints,
}) {
  const isLastCheckpoint = index + 1 === totalCheckpoints;
  const isOnlyCheckpoint = totalCheckpoints === 1;
  return (
    <div
      id="checkpoint"
      className="checkpoint-popover p-4 bg-light-300"
      role="alertdialog"
    >
      {(title || !isOnlyCheckpoint) && (
        <div className="d-flex justify-content-between mb-2.5">
          <CheckpointTitle>{title}</CheckpointTitle>
          <CheckpointBreadcrumbs currentIndex={index} totalCheckpoints={totalCheckpoints} />
        </div>
      )}
      <CheckpointBody>{body}</CheckpointBody>
      <CheckpointActionRow
        advanceButtonText={advanceButtonText}
        dismissButtonText={dismissButtonText}
        endButtonText={endButtonText}
        isLastCheckpoint={isLastCheckpoint}
        onAdvance={onAdvance}
        onDismiss={onDismiss}
        onEnd={onEnd}
      />
      <div id="arrow" data-popper-arrow />
    </div>
  );
}

Checkpoint.defaultProps = {
  advanceButtonText: null,
  body: null,
  dismissButtonText: null,
  endButtonText: null,
  title: null,
};

Checkpoint.propTypes = {
  advanceButtonText: PropTypes.string,
  body: PropTypes.string,
  dismissButtonText: PropTypes.string,
  endButtonText: PropTypes.string,
  index: PropTypes.number.isRequired,
  onAdvance: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
  onEnd: PropTypes.func.isRequired,
  title: PropTypes.string,
  totalCheckpoints: PropTypes.number.isRequired,
};

export default Checkpoint;
