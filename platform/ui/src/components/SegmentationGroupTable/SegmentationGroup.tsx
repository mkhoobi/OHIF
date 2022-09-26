import React from 'react';
import PropTypes from 'prop-types';
import SegmentItem from './SegmentItem';
import Dropdown from '../Dropdown';
import classnames from 'classnames';
import Icon from '../Icon';
import IconButton from '../IconButton';

const AddNewSegmentRow = ({
  id,
  onConfigChange,
  onToggleSegmentationVisibility,
  onSegmentAdd,
  isVisible,
  showAddSegment,
}) => {
  return (
    <div>
      <div className="flex items-center pl-[29px] bg-black text-primary-active hover:opacity-80 cursor-pointer text-[12px] py-1">
        {showAddSegment && (
          <div className="flex items-center" onClick={() => onSegmentAdd()}>
            <Icon name="row-add" className="w-5 h-5" />
            <div className="">Add Segment</div>
          </div>
        )}
        <div className="flex-grow" />
        <div
          className="flex items-center pr-2"
          onClick={() => {
            onToggleSegmentationVisibility(id);
          }}
        >
          {isVisible ? (
            <Icon name="row-show-all" className="w-5 h-5" />
          ) : (
            <Icon name="row-hide-all" className="w-5 h-5" />
          )}
        </div>
      </div>
      {/* {isSegmentationConfigOpen && (
        <SegmentationConfig onConfigChange={onConfigChange} />
      )} */}
    </div>
  );
};

const SegmentGroupHeader = ({
  isMinimized,
  onToggleMinimizeSegmentation,
  onSegmentationClick,
  id,
  label,
  isActive,
  segmentCount,
  onSegmentationEdit,
  onSegmentationDelete,
}) => {
  return (
    <div
      className={classnames(
        'flex items-center pr-2 pl-[10px] h-[27px] gap-2 rounded-t-md border-b border-secondary-light cursor-pointer text-[12px]',
        {
          'bg-secondary-main': isActive,
          'bg-secondary-dark': !isActive,
        }
      )}
      onClick={evt => {
        evt.stopPropagation();
        onSegmentationClick(id);
      }}
    >
      <Icon
        name="panel-group-open-close"
        onClick={evt => {
          evt.stopPropagation();
          onToggleMinimizeSegmentation(id);
        }}
        className={classnames(
          'w-5 h-5 text-white transition duration-300 cursor-pointer',
          {
            'transform rotate-90': !isMinimized,
          }
        )}
      />
      <span className="text-white ">{label.toUpperCase()}</span>
      <div className="flex-grow" />
      <span className="text-white ">{segmentCount}</span>
      <div
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <Dropdown
          id="segmentation-dropdown"
          showDropdownIcon={false}
          list={[
            {
              title: 'Rename',
              onClick: () => {
                onSegmentationEdit(id);
              },
            },
            {
              title: 'Delete',
              onClick: () => {
                onSegmentationDelete(id);
              },
            },
          ]}
        >
          <IconButton
            id={''}
            variant="text"
            color="inherit"
            size="initial"
            className="text-primary-active"
          >
            <Icon name="panel-group-more" />
          </IconButton>
        </Dropdown>
      </div>
    </div>
  );
};

const SegmentationGroup = ({
  label,
  id,
  segmentCount,
  isVisible,
  isActive,
  onSegmentClick,
  isMinimized,
  onSegmentColorClick,
  showAddSegment,
  segments,
  activeSegmentIndex,
  onSegmentAdd,
  onSegmentationClick,
  onClickSegmentColor,
  onSegmentationEdit,
  onToggleSegmentVisibility,
  onToggleSegmentationVisibility,
  onSegmentDelete,
  onToggleMinimizeSegmentation,
  onSegmentationConfigChange,
  onSegmentationDelete,
  onSegmentEdit,
}) => {
  return (
    <div className="flex flex-col">
      <SegmentGroupHeader
        id={id}
        label={label}
        isActive={isActive}
        isMinimized={isMinimized}
        onToggleMinimizeSegmentation={onToggleMinimizeSegmentation}
        onSegmentationClick={onSegmentationClick}
        segmentCount={segmentCount}
        onSegmentationEdit={onSegmentationEdit}
        onSegmentationDelete={onSegmentationDelete}
      />
      {!isMinimized && (
        <div className="max-h-104 ohif-scrollbar overflow-hidden">
          <AddNewSegmentRow
            onConfigChange={onSegmentationConfigChange}
            onSegmentAdd={onSegmentAdd}
            isVisible={isVisible}
            onToggleSegmentationVisibility={onToggleSegmentationVisibility}
            id={id}
            showAddSegment={showAddSegment}
          />
          {!!segments.length &&
            segments.map(segment => {
              if (segment === undefined || segment === null) {
                return null;
              }

              const {
                segmentIndex,
                color,
                label,
                isVisible,
                isLocked,
              } = segment;
              return (
                <SegmentItem
                  key={segmentIndex}
                  segmentationId={id}
                  segmentIndex={segmentIndex}
                  label={label}
                  color={color}
                  isActive={activeSegmentIndex === segmentIndex}
                  isLocked={isLocked}
                  isVisible={isVisible}
                  onClick={onSegmentClick}
                  onEdit={onSegmentEdit}
                  onDelete={onSegmentDelete}
                  onColor={onSegmentColorClick}
                  onToggleVisibility={onToggleSegmentVisibility}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

SegmentationGroup.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  segments: PropTypes.array.isRequired,
  segmentCount: PropTypes.number.isRequired,
  isVisible: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  isMinimized: PropTypes.bool.isRequired,
  activeSegmentIndex: PropTypes.number,
  onClickNewSegment: PropTypes.func.isRequired,
  onClickSegment: PropTypes.func.isRequired,
  onClickSegmentEdit: PropTypes.func.isRequired,
  onClickSegmentDelete: PropTypes.func.isRequired,
  onToggleSegmentLocked: PropTypes.func,
  onToggleSegmentVisibility: PropTypes.func.isRequired,
  onToggleSegmentationVisibility: PropTypes.func.isRequired,
  onSegmentClick: PropTypes.func.isRequired,
  showAddSegment: PropTypes.bool.isRequired,
  onSegmentAdd: PropTypes.func.isRequired,

  onSegmentationClick: PropTypes.func.isRequired,
  onClickSegmentColor: PropTypes.func.isRequired,
  onSegmentationEdit: PropTypes.func.isRequired,
  onSegmentDelete: PropTypes.func.isRequired,
  onToggleMinimizeSegmentation: PropTypes.func.isRequired,
  onSegmentationConfigChange: PropTypes.func.isRequired,
  onSegmentationDelete: PropTypes.func.isRequired,
  onSegmentEdit: PropTypes.func.isRequired,
};

SegmentationGroup.defaultProps = {
  label: '',
  segmentCount: 0,
  segments: [],
};

export default SegmentationGroup;
